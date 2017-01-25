import path from 'path'

let rootDir = path.dirname(__dirname)

export default {
    directory : {
        controller: path.join(rootDir, 'controllers'),
        model: path.join(rootDir, 'models'),
        view: path.join(rootDir, 'views'),
        route: path.join(rootDir, 'routes'),
        public: path.join(rootDir, 'public') 
    }
}