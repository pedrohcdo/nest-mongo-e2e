import { MongoMemoryServer } from 'mongodb-memory-server'

export default async () => {
	const grrenTag = '\x1b[42m%s\x1b[0m'
	console.log()
	console.log(grrenTag, 'Setup', 'The mongo server is being setting up')
	const mongoDbInMemory = new MongoMemoryServer({
		instance: {
			port: 51751,
		},
	})
	await mongoDbInMemory.start()
	console.log(
		grrenTag,
		'Setup',
		'The mongo server has been configured correctly: ' + mongoDbInMemory.getUri()
	)

	global.E2E_CONTEXT = {
		teardown: async () => {
			console.log(grrenTag, 'Teardown', 'The mongo server is being stoped')
			await mongoDbInMemory.stop({
				doCleanup: true,
				force: true,
			})
			console.log(grrenTag, 'Teardown', 'The mongo server was stopped')
		},
	}
}
