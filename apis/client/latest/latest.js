import { Apis } from '/apis/collection';
import { Template } from 'meteor/templating';

Template.latestApis.onCreated(function () {
  // Reference to Template instance
  const instance = this;

  // Apis query limit (default: 8)
  let limit = 8;

  // Override default limit if passed in as template argument
  if (instance.data && instance.data.limit) {
    limit = instance.data.limit;
  }

  // Subscribe to latestApiBackends publication & pass limit parameter
  instance.subscribe('latestPublicApis', limit);
});

Template.latestApis.helpers({
  latestApis () {
    // Retrieve last API Backends
    return Apis.find({}, { sort: { created_at: -1 } }).fetch();
  },
});
