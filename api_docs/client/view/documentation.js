import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Template } from 'meteor/templating';

import Settings from '/settings/collection';

Template.apiDocumentation.onCreated(function () {
  const instance = this;

  // Run subscription in autorun
  instance.autorun(() => {
    // Get current documentation file Id
    const documentationFileId = Template.currentData().api.documentationFileId;

    if (documentationFileId) {
      // Subscribe to documentation
      instance.subscribe('singleDocumentationFile', documentationFileId);
    }
  });

  // Subscribe to code generator settings
  instance.subscribe('singleSetting', 'sdkCodeGenerator');
});

Template.apiDocumentation.onRendered(() => {
  $('[data-toggle="popover"]').popover();
});

Template.apiDocumentation.helpers({
  documentationExists () {
    return !!(this.api.documentationFileId || this.api.documentationUrl);
  },
  codegenServerExists () {
    // Get template instance
    const instance = Template.instance();

    // Get settings
    const settings = Settings.findOne();

    let exists;
    // Check documentation exists, generator is enabled and host setting exists
    if (
      settings &&
      settings.sdkCodeGenerator &&
      settings.sdkCodeGenerator.host &&
      settings.sdkCodeGenerator.enabled
    ) {
      // Get code generator host
      instance.codegenServer = settings.sdkCodeGenerator.host;

      // Generator is enabled and has host setting, codegen server exists
      exists = true;
    }
    return exists;
  },

});

Template.apiDocumentation.events({
  'click #manage-api-documentation': function (event, templateInstance) {
    // Get reference to API backend
    const api = templateInstance.data.api;
    // Show the manage API documentation form
    Modal.show('manageApiDocumentationModal', { api });
  },
  'click #sdk-code-generator': function (event, templateInstance) {
    // Get reference to API backend
    const api = templateInstance.data.api;
    // Get reference to Code Generator host
    const host = templateInstance.codegenServer;
    // Show the SDK Code generator form
    Modal.show('sdkCodeGeneratorModal', { api, host });
  },
});