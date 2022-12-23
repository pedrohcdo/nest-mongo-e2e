import { BadRequestException, Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import { UserRepository } from '../repository/user/user.repository'

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	async getUserNameByEmail(email: string): Promise<string> {
		const user = await this.userRepository.getByEmail(email)
		if (!user) throw new BadRequestException('user not found')
		return user.name
	}
}
