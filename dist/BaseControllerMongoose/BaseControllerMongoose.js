"use strict";
var core_1 = require('bap-node-microframework/core');
var BaseControllerMongoose = (function () {
    function BaseControllerMongoose() {
    }
    BaseControllerMongoose.prototype.get = function (res, model) {
        if (typeof model !== "string") {
            res.status(200).json(model);
        }
    };
    BaseControllerMongoose.prototype.cget = function (res, model) {
        var getModel = core_1.Container.getModel(model);
        getModel.find().then(function (data) { res.status(200).json(data); }, function (err) { res.status(404).json({ error: err }); });
    };
    BaseControllerMongoose.prototype.post = function (model, form, request, response) {
        var postModel;
        var tmp = core_1.Container.getModel(model);
        postModel = new tmp({});
        if (typeof model === "string") {
            model = postModel;
        }
        BaseControllerMongoose.processForm(model, form, request, response);
    };
    BaseControllerMongoose.prototype.put = function (model, form, request, response) {
        BaseControllerMongoose.processForm(model, form, request, response);
    };
    BaseControllerMongoose.processForm = function (model, form, request, response) {
        form.handle(request, {
            success: function (form) {
                Object.keys(form.data).forEach(function (key) {
                    model[key] = form.data[key];
                });
                model.save().then(function (savedModel) {
                    if (request.method === 'PUT') {
                        return response.status(204).send();
                    }
                    return response.status(201).send(savedModel);
                }, function (error) { response.status(500).json(error); });
            },
            error: function (form) {
                response.status(400).json(form);
            },
            empty: function (form) {
                response.status(404).json(form);
            }
        });
    };
    BaseControllerMongoose.prototype.delete = function (res, object) {
        object.remove().then(function () { res.status(204).send(); }, function (err) { res.status(500).json({ error: err }); });
    };
    return BaseControllerMongoose;
}());
exports.BaseControllerMongoose = BaseControllerMongoose;
//# sourceMappingURL=BaseControllerMongoose.js.map