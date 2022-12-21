import { Module } from '@nestjs/common'
import { GlobalModule } from './config/global.module'
import { UsersModule } from './samples/users/users.module'

//
@Module({
	imports: [GlobalModule, UsersModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
