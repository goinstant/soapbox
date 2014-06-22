/* global module, _ */

'use strict';

var NO_SYNC = 'NO_SYNC';
var IN_SYNC = 'IN_SYNC';
var PENDING_SYNC = 'PENDING_SYNC';

module.exports = TalkCollection;

function TalkCollection(keyModel, userCollection, $timeout) {
  this._keyModel = keyModel;
  this._syncState = NO_SYNC;
  this._modelCache = this._keyModel;
  this._$to = $timeout;
  this._users = userCollection;
}

TalkCollection.factory = function($goKey, userCollection, $timeout) {
  var keyModel = $goKey('talks/org/public');

  return new TalkCollection(keyModel, userCollection, $timeout);
};

TalkCollection.prototype.findAll = function() {
  if (this._syncState === NO_SYNC) this._syncModel();

  return this._modelCache;
};

TalkCollection.prototype.findOne = function(id) {
  if (this._modelCache[id] && !this._modelCache.$model) {
    this._modelCache[id].$model = this._keyModel.$key(id);
  }

  if (this._modelCache[id]) return this._modelCache[id];

  this._modelCache[id] = {};
  this._modelCache[id].$model = this._keyModel.$key(id);

  var self = this;
  this._keyModel.$key(id).$$key.get(function(err, data) {
    self._$to(function() {
      _.merge(self._modelCache[id], data);

      if (data.author) {
        self._modelCache[id].author = self._users.findOne(data.author);
      }
    });

    if (self._syncState === NO_SYNC) self._syncModel();
  });

  return this._modelCache[id];
};

TalkCollection.prototype._syncModel = function() {
  this._syncState = PENDING_SYNC;
  this._modelCache.$sync();

  var self  = this;
  this._modelCache.$on('ready', function() {
    self._syncState  = IN_SYNC;

    _.each(self._modelCache, function(model, id) {
      if (model.author) {
        self._modelCache[id].author = self._users.findOne(model.author);
      }
    });
  });
};
