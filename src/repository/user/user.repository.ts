import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { User } from './user.model'

// Models
@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async getById(userId: Types.ObjectId): Promise<User> {
		return await this.userModel.findById(userId)
	}
}
