import * as http from 'http'
import { Router } from './Router'
import { app, database } from '../config'
import { Database } from './Database'

const port = process.env.NODE_ENV === 'production' ? app.production.port : app.development.port
const host = process.env.NODE_ENV === 'production' ? app.production.host : app.development.host

export class Bootstrap {
	run() {
		this.database()
		this.server()
	}
	database() {
		let db = new Database(database)
	}
	server() {
		http.createServer((request, response) => {
			new Router(request, response).run()
		}).listen(port, host)
		console.log(`Server listening on ${host}:${port}`)
	}
}
