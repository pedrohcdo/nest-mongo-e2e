import { TestingModule } from '@nestjs/testing'
import { TestUtils } from '../../utils/test-utils'
import { UsersController } from './users.controller'
import { UsersModule } from './users.module'

describe('UsersController', () => {
	let controller: UsersController

	beforeEach(async () => {
		//
		const module: TestingModule = await TestUtils.createMockedModelsModule(UsersModule)

		//
		controller = module.get<UsersController>(UsersController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
