import * as ES6Promise from 'es6-promise'
import mongoose = require('mongoose')

export default class {
    config: any

    constructor(config)  {
        this.config = config
    }
    connect() {
        mongoose.connect(`mongodb://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.database}`, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
            else {
                console.log('Connected to MongoDb');
            }
        })
        mongoose.Promise = ES6Promise.Promise

    }
}
