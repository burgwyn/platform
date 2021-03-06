// Meteor package import
import { AutoForm } from 'meteor/aldeed:autoform';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { TAPi18n } from 'meteor/tap:i18n';

AutoForm.hooks({
  apiDetailsForm: {
    onSuccess () {
      // Get success message translation
      const message = TAPi18n.__('apiDetailsForm_text_updateInformation');

      // Show message
      sAlert.success(message);
    },
  },
});
