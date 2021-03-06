import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Template } from 'meteor/templating';
import ApiBacklogItems from '../../collection';

Template.deleteBacklogItem.events({
  'click #confirm-delete': function () {
    // Get Backlog Item ID
    const backlogItemId = Template.currentData().backlogItem._id;

    // Remove the Backlog Item
    ApiBacklogItems.remove(backlogItemId);

    // Close the modal
    Modal.hide('deleteBacklogItem');
  },
});
