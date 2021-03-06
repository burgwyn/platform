import { Accounts } from 'meteor/accounts-base';
import { AutoForm } from 'meteor/aldeed:autoform';
import { TAPi18n } from 'meteor/tap:i18n';
import { sAlert } from 'meteor/juliancwirko:s-alert';

AutoForm.hooks({
  updatePassword: {
    onSubmit (insertDoc) {
      this.event.preventDefault();
      const instance = this;
      Accounts.changePassword(insertDoc.old, insertDoc.new, (error) => {
        $('.btn-primary').attr('disabled', null);
        if (error) {
          // Alert the user of failure
          sAlert.error(error.message);
          instance.done(error.message);
        } else {
          // Get password update success message translation
          const message = TAPi18n.__('updatePasswordForm_successMessage');

          // Alert the user of success
          sAlert.success(message);
          instance.done(message);

          // Clear the form
          AutoForm.resetForm('updatePassword');
        }
      });
      return true;
    },
  },
});
