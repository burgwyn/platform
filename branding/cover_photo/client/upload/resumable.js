import { Meteor } from 'meteor/meteor';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { TAPi18n } from 'meteor/tap:i18n';

import Branding from '/branding/collection';
import CoverPhoto from '/branding/cover_photo/collection';
import fileNameEndsWith from '/core/helper_functions/file_name_ends_with';

Meteor.startup(() => {
  // Set cover photo id to branding collection on Success
  CoverPhoto.resumable.on('fileSuccess', (file) => {
    // Get the id from project logo file object
    const coverPhotoFileId = file.uniqueIdentifier;

    // Get branding
    const branding = Branding.findOne();

    // Update logo id field
    Branding.update(branding._id, { $set: { coverPhotoFileId } });

    // Get upload success message translation
    const message = TAPi18n.__('uploadCoverPhoto_successfully_uploaded');

    // Alert user of successful upload
    sAlert.success(message);
  });

  CoverPhoto.resumable.on('fileAdded', (file) => {
    return CoverPhoto.insert({
      _id: file.uniqueIdentifier,
      filename: file.fileName,
      contentType: file.file.type,
    }, (err) => {
      if (err) {
        // Create & show a message about failed
        const message = `${TAPi18n.__('uploadCoverPhoto_acceptedExtensions_errorText')} ${err}`;
        sAlert.warning(message);
        return;
      }

      // Available extensions for pictures
      const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

      // Check extensions for uploading file: is it a picture or not?
      if (fileNameEndsWith(file.file.name, acceptedExtensions)) {
        // Upload the cover photo
        CoverPhoto.resumable.upload();
      } else {
        // Get extension error message
        const message = TAPi18n.__('uploadCoverPhoto_acceptedExtensions');

        // Alert user of extension error
        sAlert.error(message);
      }
    });
  });
});
