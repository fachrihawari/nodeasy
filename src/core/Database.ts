import { database } from '../config'

export interface IDatabaseConnection {
    config: Object,
    connect: void
}

