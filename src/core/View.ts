import * as pug from 'pug'
import * as path from 'path'
import { directory } from '../config'

export class View {

    params: Object
    filename: String
    
    constructor(filename, params) {
        this.filename = filename
        this.params = params
    }
    render () {
        return pug.renderFile( path.join(directory.view, this.filename + '.pug'), this.params)
    }
}