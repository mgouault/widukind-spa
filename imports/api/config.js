import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import _ from 'lodash';

export const Config = new Mongo.Collection('config');

if (Meteor.isServer) {
  let configURLObj = Meteor.settings.URLObj;
  let URLObj = {
    'protocol': process.env['WIDUKIND_API_PROTOCOL'] || configURLObj['protocol'],
    'host': process.env['WIDUKIND_API_HOST'] || configURLObj['host'],
    'hostname': process.env['WIDUKIND_API_HOSTNAME'] || configURLObj['hostname'],
    'port': process.env['WIDUKIND_API_PORT'] || configURLObj['port'],
    'pathname': process.env['WIDUKIND_API_PATHNAME'] || configURLObj['pathname'],
    'query': {
      'per_page': process.env['WIDUKIND_SPA_LIMIT'] || _.get(configURLObj, 'query.per_page')
    }
  };

  let configPattern = {
    'protocol': Match.Optional(String),
    'host': Match.Optional(String),
    'hostname': Match.Optional(String),
    'port': Match.Optional(Match.OneOf(String, Number)),
    'pathname': Match.Optional(String),
    'query': Match.Optional(Match.Where(obj => {
      if (typeof obj !== 'object') { return false; }
      return _.every(Object.keys(obj), key => {
        return Match.test(obj[key], String);
      })
    }))
  };

  Meteor.methods({
    'config.get': function () {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      let config = Config.findOne({ 'userId': this.userId });
      if (!config) {
        config = _.cloneDeep(URLObj);
      }
      return config;
    },
    'config.modify': function (config) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      check(config, configPattern);
      config.userId = this.userId;
      Config.upsert({ 'userId': this.userId }, config);
      return config;
    },
    'config.remove': function () {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      Config.remove({ 'userId': this.userId });
      return _.cloneDeep(URLObj);
    }
  });
}
