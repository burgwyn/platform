import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import Settings from '../';

Meteor.publish('settings', function () {
  // Only Administrator can access all settings
  const userIsAdministrator = Roles.userIsInRole(this.userId, 'admin');

  // Placeholder for settings, if user is authorized
  let settingsCursor;

  if (userIsAdministrator) {
    // User is authorized
    settingsCursor = Settings.find();
  } else {
    // User is not authorized
    settingsCursor = [];
  }
  return settingsCursor;
});

Meteor.publish('singleSetting', (setting) => {
  // Make sure setting is a String
  check(setting, String);

  // TODO: Determine if/how to check whether user is authorized to view setting

  // Set up a query settings object containing fields and a result limit
  const querySettings = { fields: {}, limit: 1 };

  // Specify the setting field we want to retrieve (passed in as argument)
  querySettings.fields[setting] = 1;

  // Return a cursor containing only the requested setting from the Settings document
  const cursor = Settings.find({}, querySettings);

  return cursor;
});
