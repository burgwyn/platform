import { Template } from 'meteor/templating';

import DocumentationFiles from '/documentation/collection';

Template.manageApiDocumentationModalUploadButton.onRendered(() => {
  // Assign resumable browse to element
  DocumentationFiles.resumable.assignBrowse($('#file-browse'));
});
