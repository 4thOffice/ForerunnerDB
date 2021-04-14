"use strict";

var Shared = require('./Shared');

var Data = function (name, options) {
    this.init.apply(this, arguments);
};

Data.prototype.init = function (name, options) {
    this._data = [];
};

Shared.addModule('Data', Data);

Data.prototype.filter = function (matcher, updateLastAccessedAt = false) {
    let data = this._data.filter(matcher)

    /**
     * Control whether or not _lastAccessedAt is set with '__updateAccessedAt__' option
     * (default set to false to not update if called from console or on load).
     * Always update _lastAccessedAt if missing
     */
    if (data && data.length > 0) {
        let date = new Date().toISOString();
        try {
            data.forEach((r) => {
                if (updateLastAccessedAt || !r._lastAccessedAt) {
                    r._lastAccessedAt = date;
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    return data;
};

Data.prototype.getData = function (_) {
    return this._data;
};

Data.prototype.indexOf = function (_) {
    return this._data.indexOf(...arguments);
};

Data.prototype.splice = function (_) {
    return this._data.splice(...arguments);
};

Data.prototype.concat = function (_) {
    this._data = this._data.concat(...arguments);
    return this;
};

Data.prototype.pop = function (_) {
    return this._data.pop();
};

Data.prototype.getLength = function (_) {
    return this._data.length;
};

Data.prototype.clearData = function (_) {
    return this._data.length = 0;
};

Shared.finishModule('Data');
module.exports = Data;