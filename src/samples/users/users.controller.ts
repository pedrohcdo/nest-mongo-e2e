import { Controller, Get, Param } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('get-user-name/:userId')
	@ApiParam({ name: 'userId', example: '61d5b3c273ef284bab47baa0' })
	getUserById(@Param('userId') userId: string) {
		return this.usersService.getUserNameById(userId)
	}
}
