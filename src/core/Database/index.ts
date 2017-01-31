export class Database {
    config: any

    constructor(config)  {
        let dbDriver = require(`./Drivers/${config.driver}`).default
        let driverInstance = new dbDriver(config)
        driverInstance.connect()
    }
}
