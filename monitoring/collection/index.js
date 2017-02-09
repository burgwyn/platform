import { Mongo } from 'meteor/mongo';

const MonitoringSettings = new Mongo.Collection('MonitoringSettings');
const MonitoringData = new Mongo.Collection('MonitoringData');

export { MonitoringSettings, MonitoringData };
