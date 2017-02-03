import * as path from 'path'

let rootDir = path.dirname(__dirname)
let appDir = path.join(rootDir, 'app')

export default {
    config: path.join(rootDir, 'config'),
    controller: path.join(appDir, 'Controllers'),
    middleware: path.join(appDir, 'Middlewares'),
    model: path.join(appDir, 'Models'),
    view: path.join(rootDir, 'resources/views'),
    lang: path.join(rootDir, 'resources/lang'),
    route: path.join(rootDir, 'routes'),
    public: path.join(rootDir, 'public'),
    core: path.join(rootDir, 'core')
}
