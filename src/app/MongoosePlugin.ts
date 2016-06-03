import * as config from 'config';
import * as Mongoose from 'mongoose';
import { Container } from 'bap-node-microframework/core';

export class MongoosePlugin {
    constructor(options) {
        let mongoose = Mongoose.connect(options.dsn);
        Container.registerService('mongoose', mongoose);
    }
}
