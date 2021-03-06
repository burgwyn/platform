import { Meteor } from 'meteor/meteor';
import ProjectLogo from '/branding/logo/collection';

Meteor.publish('projectLogo', () => {
  return ProjectLogo.find({
    'metadata._Resumable': {
      $exists: false,
    },
  });
});
