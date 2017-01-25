import path from 'path'

let rootDir = path.dirname(__dirname)

export default {
    directory : {
        controller: path.join(rootDir, 'app/Controllers'),
        model: path.join(rootDir, 'app/Models'),
        view: path.join(rootDir, 'app/Views'),
        route: path.join(rootDir, 'routes'),
        public: path.join(rootDir, 'public'),        
        core: path.join(rootDir, 'core')  
    }
}