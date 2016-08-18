import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Prefs = new Mongo.Collection('prefs');

if (Meteor.isServer) {
  Meteor.publish('prefs', function prefsPublication() {
    return Prefs.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  // 'tasks.insert'(text) {
  //   check(text, String);
  //
  //   // Make sure the user is logged in before inserting a task
  //   if (! this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Tasks.insert({
  //     text,
  //     createdAt: new Date(),
  //     owner: this.userId,
  //     username: Meteor.users.findOne(this.userId).username,
  //   });
  // },
  // 'tasks.remove'(taskId) {
  //   check(taskId, String);
  //
  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //    // If the task is private, make sure only the owner can delete it
  //    throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Tasks.remove(taskId);
  // },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can check it off
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
  // 'tasks.setPrivate'(taskId, setToPrivate) {
  //   check(taskId, String);
  //   check(setToPrivate, Boolean);
  //
  //   const task = Tasks.findOne(taskId);
  //
  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Tasks.update(taskId, { $set: { private: setToPrivate } });
  // },
});



/*
let _ = require('lodash');
let config = require('config');

let configURLObj = config.get('api.URLObj');
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

app.get('/config', function (req, res, next) {
  let obj = _.cloneDeep(URLObj);
  res.status(200).json(obj);
});
*/
