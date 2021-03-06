import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { TAPi18n } from 'meteor/tap:i18n';

AutoForm.hooks({
  authorizedUserForm: {
    onSubmit (submission) {
      // Get email address from form submission
      const email = submission.email;

      // Get reference to API ID
      const apiId = submission.apiId;

      // Get reference to form, for use in method callback(s)
      const form = this;

      // Check if the email address is linked to a registered user
      Meteor.call('checkIfEmailIsRegistered', email, (error, emailIsRegistered) => {
        if (emailIsRegistered) {
          // Add user to API authorized users list
          // eslint-disable-next-line no-unused-vars
          Meteor.call('addAuthorizedUserByEmail', apiId, email, (authError, result) => {
            if (!authError) {
              // Continue with form submission
              form.done();
            }
          });
        } else {
          // Get 'email not registered' error message translation
          const message = TAPi18n.__('authorizedUserForm_emailNotRegistered_errorText');

          // Warn manager that user email is not registered
          sAlert.warning(message);

          // throw an error
          form.done(new Error('email-not-registered'));
        }
      });
    },
    onSuccess () {
      // Get success message translation
      const message = TAPi18n.__('authorizedUserForm_success_message');

      // Alert user of success
      sAlert.success(message);
    },
    onError (error) {
      // do something with the error
      // eslint-disable-next-line no-console
      console.log(error);
    },
  },
});
