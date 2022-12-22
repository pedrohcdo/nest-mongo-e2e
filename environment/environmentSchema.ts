import * as Joi from 'joi'

export const environmentSchema = Joi.object({
	NODE_ENV: Joi.string().valid('local', 'debug', 'test', 'development', 'production').default('local'),

	MONGO_URI: Joi.string().required()
})


