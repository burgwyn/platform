import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';

import OrganizationApis from '/organization_apis/collection';
import Organizations from '../';

Meteor.publish('allOrganizationBasicDetails', () => {
  return Organizations.find({},
    {
      fields: {
        _id: 1,
        name: 1,
        description: 1,
        contact: 1,
      },
    });
});

// Publish collection for pagination
// TODO: Determine if there is a better way to handle pagination
// eslint-disable-next-line no-new
new Meteor.Pagination(Organizations);

Meteor.publish('userManagedOrganizations', function () {
  return Organizations.find({ managerIds: this.userId });
});

Meteor.publish('organizationApisCount', function (organizationId) {
  // Make sure 'organizationId' is a String
  check(organizationId, String);
  // Publish count of organization apis
  const organizationApisCount = OrganizationApis.find({ organizationId });
  // Publish an Api Counter for each Organization
  Counts.publish(this, `organizationApisCount-${organizationId}`, organizationApisCount);
});

Meteor.publishComposite('organizationComposite', (slug) => {
  /*
  Returning an organization with managers
  TODO:
  Move all organization related publicationd as children
  */
  check(slug, String);
  return {
    find () {
      return Organizations.find({ slug });
    },
    children: [
      {
        find (organization) {
          return Meteor.users.find(
            { _id: { $in: organization.managerIds } },
            { fields: { username: 1, emails: 1, _id: 1 } });
        },
      },
    ],
  };
});
