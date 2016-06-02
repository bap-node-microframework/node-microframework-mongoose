"use strict";
var Mongoose = require('mongoose');
var core_1 = require('bap-node-microframework/core');
var MongoosePlugin = (function () {
    function MongoosePlugin(dns) {
        var mongoose = Mongoose.connect(dns);
        core_1.Container.registerService('mongoose', mongoose);
    }
    return MongoosePlugin;
}());
exports.MongoosePlugin = MongoosePlugin;
