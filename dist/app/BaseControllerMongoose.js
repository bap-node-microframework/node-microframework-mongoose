"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('bap-node-microframework/core');
var BaseControllerMongoose = (function (_super) {
    __extends(BaseControllerMongoose, _super);
    function BaseControllerMongoose() {
        _super.apply(this, arguments);
    }
    BaseControllerMongoose.prototype.get = function (res, model) {
        if (typeof model !== "string") {
            res.status(200).json(model);
        }
    };
    BaseControllerMongoose.prototype.cget = function (res, model) {
        core_1.Container.getModel(model).find().then(function (data) { res.status(200).json(data); }, function (err) { res.status(404).json({ error: err }); });
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
}(core_1.BaseController));
exports.BaseControllerMongoose = BaseControllerMongoose;
//# sourceMappingURL=BaseControllerMongoose.js.map