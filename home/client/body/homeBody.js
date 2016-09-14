import { contactEmailValid } from '/lib/helperFunctions/validateSettings';
import { Settings } from '/settings/collection';

Template.homeBody.onCreated(function () {
  // Subscribe to settings publication
  this.subscribe('settings');
});

Template.homeBody.rendered = function () {
  $('.contact-us-link').click(function () {
    document.getElementById('contact-us').scrollIntoView();
  });
};

Template.homeBody.helpers({
  contactFormEnabled () {
    const settings = Settings.findOne();

    // Check mail is enabled & contact email has been given
    if(settings.mail.enabled && contactEmailValid(settings)) {
      return true;
    } else {
      return false;
    }
  },
});
