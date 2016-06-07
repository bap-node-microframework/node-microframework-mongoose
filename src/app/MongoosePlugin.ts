import * as Mongoose from 'mongoose';
import { Container } from 'bap-node-microframework/core';

export class MongoosePlugin {
    private instance: any;
    private name: String = 'mongoose';

    constructor(container, options) {
        this.instance = Mongoose.connect(options.dsn);
        container.registerService(this.name, this.instance);
        Container.setApplicationInstance(container);
    }

    getInstance() {
        return this.instance;
    }

    getName() {
        return this.name;
    }
}
