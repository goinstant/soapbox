/* global module, _ */

'use strict';

var NO_SYNC = 'NO_SYNC';
var IN_SYNC = 'IN_SYNC';
var PENDING_SYNC = 'PENDING_SYNC';

module.exports = UserCollection;

function UserCollection(usersModel, $timeout) {
  this._usersModel = usersModel;
  this._syncState = NO_SYNC;
  this._modelCache = this._usersModel;
  this._$to = $timeout;
}

UserCollection.factory = function($goUsers, $timeout) {
  var usersModel = $goUsers();

  return new UserCollection(usersModel, $timeout);
};

UserCollection.prototype.findAll = function() {
  if (this._syncState === NO_SYNC) this._syncModel();

  return this._modelCache;
};

UserCollection.prototype.findOne = function(id) {
  if (this._modelCache[id] && !this._modelCache.$model) {
    this._modelCache[id].$model = this._usersModel.$getUser(id);
  }

  if (this._modelCache[id]) return this._modelCache[id];

  this._modelCache[id] = {};
  this._modelCache[id].$model = this._usersModel.$getUser(id);

  var self = this;
  this._usersModel.$getUser(id).$$key.get(function(err, data) {
    self._$to(function() { _.merge(self._modelCache[id], data); });

    if (self._syncState === NO_SYNC) self._syncModel();
  });

  return this._modelCache[id];
};

UserCollection.prototype._syncModel = function() {
  this._syncState = PENDING_SYNC;
  this._modelCache.$sync();

  var self  = this;
  this._modelCache.$on('ready', function() {
    self._syncState  = IN_SYNC;
  });
};
