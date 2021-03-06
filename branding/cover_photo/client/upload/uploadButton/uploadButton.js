import { Template } from 'meteor/templating';

import CoverPhoto from '/branding/cover_photo/collection';

Template.uploadCoverPhotoButton.onRendered(() => {
  // Assign resumable browse to element
  CoverPhoto.resumable.assignBrowse($('#cover-photo-browse'));
});
