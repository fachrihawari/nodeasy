import pug from 'pug'
import config from '../config/app'
import path from 'path'

export class View {
    constructor(filename, params) {
        this.filename = filename
        this.params = params
    }
    render () {
        return pug.renderFile( path.join(config.directory.view, this.filename + '.pug'), this.params)
    }
}