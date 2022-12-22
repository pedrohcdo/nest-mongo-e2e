import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { User } from './user.model'

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async getByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({
			email: email
		})
	}
}
