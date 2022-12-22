export default () => ({
	port: process.env.PORT,

	database: {
		uri: process.env.MONGO_URI,
	},
})
