import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user/user.model'
import { UserRepository } from './user/user.repository'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],

	providers: [UserRepository],
	exports: [UserRepository],
})
export class RepositoryModule {}
