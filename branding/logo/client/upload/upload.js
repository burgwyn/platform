// Meteor packages imports
import { TAPi18n } from 'meteor/tap:i18n';
import { sAlert } from 'meteor/juliancwirko:s-alert';

// Collection imports
import Branding from '/branding/collection';
import ProjectLogo from '/branding/logo/collection';

Template.uploadProjectLogo.onCreated(function () {
  const instance = this;

  // Subscribe to Project logo
  instance.subscribe('projectLogo');
  instance.subscribe('branding');
});

Template.uploadProjectLogo.events({
  'click .delete-projectLogo': function () {
    // Show confirmation dialog to user
    // eslint-disable-next-line no-alert
    const confirmation = confirm(TAPi18n.__('uploadProjectLogo_confirm_delete'));

    // Check if user clicked "OK"
    if (confirmation === true) {
      // Get branding
      const branding = Branding.findOne();

      // Get branding project logo file id
      const projectLogoFileId = branding.projectLogoFileId;

      // Convert to Mongo ObjectID
      const objectId = new Mongo.Collection.ObjectID(projectLogoFileId);

      // Remove project logo object
      ProjectLogo.remove(objectId);

      // Remove prokect logo file id field
      Branding.update(branding._id, { $unset: { projectLogoFileId: '' } });

      // Get deletion success message translation
      const message = TAPi18n.__('uploadProjectLogo_successfully_deleted');

      // Alert user of successful delete
      sAlert.success(message);
    }
  },
});

Template.uploadProjectLogo.helpers({
  uploadedLogoLink () {
    const currentProjectLogoFileId = this.branding.projectLogoFileId;

    // Convert to Mongo ObjectID
    const objectId = new Mongo.Collection.ObjectID(currentProjectLogoFileId);

    // Get project logo file Object
    const currentProjectLogoFile = ProjectLogo.findOne(objectId);

    let projectLogoFileUrl;
    // Check if project logo file is available
    if (currentProjectLogoFile) {
      // Get Meteor absolute URL
      const meteorAbsoluteUrl = Meteor.absoluteUrl().slice(0, -1);

      const baseProjectLogoFotoUrl = meteorAbsoluteUrl + ProjectLogo.baseURL;
      // Get project logo file URL
      projectLogoFileUrl = `${baseProjectLogoFotoUrl}/id/${currentProjectLogoFileId}`;
    }
    return projectLogoFileUrl;
  },
  uploadedProjectLogoFile () {
    const currentProjectLogoFileId = this.branding.projectLogoFileId;

    // Convert to Mongo ObjectID
    const objectId = new Mongo.Collection.ObjectID(currentProjectLogoFileId);

    // Get project logo file Object
    const currentProjectLogoFile = ProjectLogo.findOne(objectId);

    // Check if project logo file is available
    return currentProjectLogoFile;
  },
});
