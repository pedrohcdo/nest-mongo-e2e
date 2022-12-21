export default () => ({
	port: process.env.PORT,

	database: {
		uri: process.env.LEGACY_MONGO_URI
	}
})
