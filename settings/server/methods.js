// Meteor packages import
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';

// Apinf import
import { githubSettingsValid, mailSettingsValid } from '/core/helper_functions/validate_settings';
import Settings from '../collection';

Meteor.methods({
  configureSmtpSettings () {
    // Get current settings
    const settings = Settings.findOne();

    // Check if mail settings are provided
    if (mailSettingsValid(settings)) {
      const username = encodeURIComponent(settings.mail.username);
      const password = encodeURIComponent(settings.mail.password);

      const smtpHost = encodeURIComponent(settings.mail.smtpHost);
      const smtpPort = encodeURIComponent(settings.mail.smtpPort);

      // Set MAIL_URL env variable
      // Note, this must be on one, long line for the URL to be valid
      process.env.MAIL_URL = `smtp://${username}:${password}@${smtpHost}:${smtpPort}`;

      // Set the 'from email' address, so that mail can send properly
      Accounts.emailTemplates.from = settings.mail.fromEmail;
    }
  },
  disableAccountEmailSettings () {
    // NOTE: This does not work
    // TODO: figure out if/how we can dynamically toggle AccountsTemplates settings
    // specifically, those related to verification email and password reset

    // Disable email related features / links for accounts templates
    // AccountsTemplates.configure({
    //   /* Verification */
    //   sendVerificationEmail: false,
    //   showResendVerificationEmailLink: false,
    //   /* Password */
    //   showForgotPasswordLink: false,
    // });
  },
  enableAccountEmailSettings () {
    // NOTE: This does not work
    // TODO: figure out if/how we can dynamically toggle AccountsTemplates settings
    // specifically, those related to verification email and password reset

    // Enable email related features / links for accounts templates
    // AccountsTemplates.configure({
    //   /* Verification */
    //   sendVerificationEmail: true,
    //   showResendVerificationEmailLink: true,
    //   /* Password */
    //   showForgotPasswordLink: true,
    // });
  },
  updateGithubConfiguration () {
    // Try if settings exist
    try {
      const settings = Settings.findOne();

      // Check if github settings are valid
      if (githubSettingsValid(settings)) {
        // remove existing configuration
        ServiceConfiguration.configurations.remove({
          service: 'github',
        });

        // Insert new service configuration
        ServiceConfiguration.configurations.insert({
          service: 'github',
          clientId: settings.githubConfiguration.clientId,
          secret: settings.githubConfiguration.secret,
        });
      }
    } catch (error) {
      // otherwise show an error
      const message = `Update gitHub configuration: ${error}`;

      throw new Meteor.Error(message);
    }
  },
  updateMailConfiguration () {
    // Try if settings exist
    try {
      // Get Settings collection
      const settings = Settings.findOne();

      // Enable/disable accounts email features based on email configuration
      if (settings.mail.enabled) {
        // Configure system SMTP variable for sending mail
        Meteor.call('configureSmtpSettings', settings);

        // Enable accounts email related features (validation, reset password)
        Meteor.call('enableAccountEmailSettings');
      } else {
        // No email verification or reset password functionality
        Meteor.call('disableAccountEmailSettings');
      }
    } catch (error) {
      // otherwise preapare message about error
      const message = `Update mail configuration: ${error}`;

      // Show an error message
      throw new Meteor.Error(message);
    }
  },
});
