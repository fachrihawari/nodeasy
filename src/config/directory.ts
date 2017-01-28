import * as path from 'path'

let rootDir = path.dirname(__dirname)

export default {
    config: path.join(rootDir, 'config'),
    controller: path.join(rootDir, 'app/Controllers'),
    model: path.join(rootDir, 'app/Models'),
    view: path.join(rootDir, 'resources/views'),
    route: path.join(rootDir, 'routes'),
    public: path.join(rootDir, 'public'),        
    core: path.join(rootDir, 'core') 
}