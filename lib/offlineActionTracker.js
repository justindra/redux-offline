"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subscriptions = {};

function registerAction(transaction) {
  return new _promise2.default(function (resolve, reject) {
    subscriptions[transaction] = { resolve: resolve, reject: reject };
  });
}

function resolveAction(transaction, value) {
  var subscription = subscriptions[transaction];
  if (subscription) {
    subscription.resolve(value);
    delete subscriptions[transaction];
  }
}

function rejectAction(transaction, error) {
  var subscription = subscriptions[transaction];
  if (subscription) {
    subscription.reject(error);
    delete subscriptions[transaction];
  }
}

var withPromises = {
  registerAction: registerAction,
  resolveAction: resolveAction,
  rejectAction: rejectAction
};

var withoutPromises = {
  registerAction: function registerAction() {},
  resolveAction: function resolveAction() {},
  rejectAction: function rejectAction() {}
};

exports.default = {
  withPromises: withPromises,
  withoutPromises: withoutPromises
};