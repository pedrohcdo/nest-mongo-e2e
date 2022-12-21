import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import environment from '../config/environment.config'
import { environmentSchema } from '../../environment/environmentSchema'
import { MongooseModule } from '@nestjs/mongoose'

//
@Global()
@Module({
	imports: [
		// 
		ConfigModule.forRoot({
			envFilePath: `./environment/development.env`,
			load: [environment],
			validationSchema: environmentSchema,
		}),

		// 
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('database.uri'),
			}),
		})
	],

	exports: [ConfigModule, MongooseModule],
})
export class GlobalModule {}
