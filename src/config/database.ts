let databaseConfiguration = {
    MySQL: {
        driver: 'MySQL',
        host: 'localhost',
        port: '80',
        username: '',
        password: '',
        database: '',
        debug: true
    },
    MongoDB: {
        driver: 'MongoDB',
        host: 'localhost',
        port: '27017',
        username: 'nodeasy',
        password: 'nodeasy',
        database: 'nodeasy',
        debug: true
    }
}


let currentUse = databaseConfiguration.MongoDB

export default currentUse
