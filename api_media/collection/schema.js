import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Posts from './';

const postsSchema = new SimpleSchema({
  title: {
    type: String,
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
  apiId: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
      return this.unset();  // Prevent user from supplying their own value
    },
  },
  userId: {
    type: String,
    autoValue () {
      if (this.isInsert) {
        return Meteor.userId();
      } else if (this.isUpsert) {
        return { $setOnInsert: Meteor.userId() };
      }
      return this.unset();  // Prevent user from supplying their own value
    },
  },
  username: {
    type: String,
    autoValue () {
      if (this.isInsert) {
        return Meteor.user().username;
      } else if (this.isUpsert) {
        return { $setOnInsert: Meteor.user().username };
      }
      return this.unset();  // Prevent user from supplying their own value
    },
  },
});
Posts.attachSchema(postsSchema);
