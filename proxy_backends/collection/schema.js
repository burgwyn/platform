import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import _ from 'lodash';

import Proxies from '/proxies/collection';
import ApiUmbrellaSchema from './apiUmbrellaSchema';
import ProxyBackends from './';

ProxyBackends.schema = new SimpleSchema({
  proxyId: {
    type: String,
    optional: true,
    autoform: {
      options () {
        return _.map(Proxies.find().fetch(), (proxy) => {
          return {
            label: proxy.name,
            value: proxy._id,
          };
        });
      },
    },
  },
  apiId: {
    type: String,
  },
  apiUmbrella: {
    type: ApiUmbrellaSchema,
    optional: true,
  },
});

// Internationalize schema texts
ProxyBackends.schema.i18n('schemas.proxyBackends');

// Attach schema to collection
ProxyBackends.attachSchema(ProxyBackends.schema);
