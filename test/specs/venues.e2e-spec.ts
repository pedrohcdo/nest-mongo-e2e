import { INestApplication } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import request from 'supertest'
import { Model } from 'mongoose'
import { StubFactory } from '../../src/repository/__mocks__/stubs-data'
import { User } from 'src/repository/user/user.model'
import { UsersModule } from 'src/samples/users/users.module'
import { getModelToken } from '@nestjs/mongoose'
import { TestUtils } from 'test/utils/test-utils'
import { ConfigModule } from '@nestjs/config'

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

	describe('with stub sample', () => {
		const userStub = StubFactory.createForUser()

		beforeAll(async () => {
			await new userModel(userStub).save()
		})

		it(`/xxx/email/${userStub.email} (GET) should return the email`, async () => {
			await request(app.getHttpServer())
				.get(`/xxx/email/${userStub.email.toString()}`)
				.expect(200)
				.expect('sample@gmail.com')
		})

		afterAll(async () => {
			await userModel.deleteOne({ _id: userStub.email })
		})
	})
})
