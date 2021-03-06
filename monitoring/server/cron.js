import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';

import { MonitoringSettings } from '/monitoring/collection';
import Apis from '/apis/collection';

import _ from 'lodash';

Meteor.methods({
  startCron (apiId, url) {
    // Make sure apiId is a String
    check(apiId, String);

    // Make sure url is a String
    check(url, String);

    // Create unique name for Cron job
    const uniqueName = `Monitoring: ${apiId}`;

    // Set time of the monitoring call
    const cronTime = 'every 1 hour';

    // Update api status to 'Loading...'
    Apis.update(apiId, { $set: { latestMonitoringStatusCode: 0 } });

    // Create cron working
    SyncedCron.add({
      name: uniqueName,
      schedule (parser) {
        // parser is a later.parse object
        return parser.text(cronTime);
      },
      job () {
        // Get API status using http request
        Meteor.call('getApiStatus', apiId, url);
      },
    });
  },
  stopCron (apiId) {
    // Make sure apiId is a String
    check(apiId, String);

    // Create unique name for Cron job
    const uniqueName = `Monitoring: ${apiId}`;

    // Stop Cron job
    SyncedCron.remove(uniqueName);

    // Update an api status
    Apis.update(apiId, { $set: { latestMonitoringStatusCode: -1 } });
  },
  restartCron () {
    // Get all apis which are added in monitoring
    const monitoringEnabled = MonitoringSettings.find().fetch();

    _.forEach(monitoringEnabled, (data) => {
      // If enabled is true then switch the monitoring
      if (data.enabled) {
        Meteor.call('getApiStatus', data.apiId, data.url);
        Meteor.call('startCron', data.apiId, data.url);
      }
    });
  },
});

