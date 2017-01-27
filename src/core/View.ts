import * as pug from 'pug'
import * as config from '../config/app'
import * as path from 'path'

export class View {

    params: Object
    filename: String
    
    constructor(filename, params) {
        this.filename = filename
        this.params = params
    }
    render () {
        return pug.renderFile( path.join(config.directory.view, this.filename + '.pug'), this.params)
    }
}