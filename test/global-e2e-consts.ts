export const INMEMORY_MONGO_SERVER_PORT = 51751

export const genTestUri = () => {
	return `mongodb://127.0.0.1:${INMEMORY_MONGO_SERVER_PORT}/`
}
