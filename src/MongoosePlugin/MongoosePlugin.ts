import * as config from 'config';
import * as Mongoose from 'mongoose';
import { Container } from 'bap-node-microframework/core';

export class MongoosePlugin {
    constructor(dns) {
        let mongoose = Mongoose.connect(dns);
        Container.registerService('mongoose', mongoose);
    }
}
