import { INestApplication } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import request from 'supertest'
import { Model } from 'mongoose'
import { StubFactory } from '../../src/repository/__mocks__/stubs-data'
import { User } from '../../src/repository/user/user.model'
import { UsersModule } from '../../src/samples/users.module'
import { getModelToken } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { TestUtils } from '../utils/test-utils'

describe('UsersModule (e2e)', () => {
	let app: INestApplication

	let userModel: Model<User>
	let httpService: HttpService

	beforeAll(async () => {
		const module = await TestUtils.createE2EModule(
			UsersModule,
			ConfigModule.forFeature(() => ({
				// Configs
			}))
		)

		app = module.createNestApplication()

		userModel = module.get<Model<User>>(getModelToken(User.name))
		httpService = module.get<HttpService>(HttpService)

		await app.init()
	})

	afterAll(async () => {
		return app.close()
	})

	describe('with stub sample', () => {
		const userStub = StubFactory.createForUser()

		beforeAll(async () => {
			await new userModel(userStub).save()
		})

		it(`/users/get-user-name/${userStub.email} (GET) should return the correct name`, async () => {
			await request(app.getHttpServer())
				.get(`/users/get-user-name/${userStub.email.toString()}`)
				.expect(200)
				.expect(userStub.name.trim())
		})

		afterAll(async () => {
			await userModel.deleteOne({ email: userStub.email })
		})
	})
})
