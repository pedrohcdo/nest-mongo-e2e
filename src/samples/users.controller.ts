import { Controller, Get, Param } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('get-user-name/:email')
	@ApiParam({ name: 'email', example: 'sample@gmail.com' })
	getUserNameByEmail(@Param('email') email: string) {
		return this.usersService.getUserNameByEmail(email)
	}
}
