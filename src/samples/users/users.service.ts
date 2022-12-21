import { BadRequestException, Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import { UserRepository } from 'src/repository/user/user.repository'


@Injectable()
export class UsersService {
	constructor(
		private readonly userRepository: UserRepository
	) {}

	async getUserNameById(userId: string): Promise<string> {
		const user = await this.userRepository.getById(new Types.ObjectId(userId));
		if(!user) 
			throw new BadRequestException('user not found')
		return user.name;
	}
}
