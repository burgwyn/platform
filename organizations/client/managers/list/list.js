import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { _ } from 'lodash';

Template.organizationManagersList.helpers({
  organizationManagers () {
    // Get organization document, reactively
    const organization = Template.currentData().organization;

    // Get all authorized users for current organization
    let organizationManagers = Meteor.users.find({
      _id: { $in: organization.managerIds },
    }).fetch();

    // flatten structure of users within organization managers array
    organizationManagers = _.map(organizationManagers, (user) => {
      return {
        username: user.username,
        email: user.emails[0].address,
        _id: user._id,
      };
    });

    return organizationManagers;
  },
  managerIsCurrentUser () {
    // Used to hide the delete button, so user cannot remove themselves

    // Get ID of current Manager
    const currentManagerId = this._id;

    // Get ID of logged in user
    const currentUserId = Meteor.userId();

    // Check if the Manager ID and User ID match
    return (currentUserId === currentManagerId);
  },
});

Template.organizationManagersList.events({
  'click #remove-organization-manager': function (event, templateInstance) {
    // Get organization object from parent templateInstance
    const organization = templateInstance.data.organization;

    // Get user document from instance data context
    const user = this;

    // Show the confirmation dialogue, passing in user document
    Modal.show('organizationRemoveManagers', { user, organization });
  },
});
