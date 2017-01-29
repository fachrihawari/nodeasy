import * as http from 'http'
import { Router } from './Router'
import { app } from '../config'

const port = process.env.NODE_ENV === 'production' ? app.production.port : app.development.port

export class Bootstrap {
	run() {
		let self = this
		http.createServer((request, response) => {
			new Router(request, response).run()
		}).listen(port, '0.0.0.0')
		console.log(`Server listening on port ${port}`)
	}
}

