import { HttpModule } from '@nestjs/axios'
import { DynamicModule, ForwardReference, Type } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

type ModuleType = Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference

export class TestUtils {
	/**
	 *
	 */
	static async createE2EModule(...importModules: ModuleType[]): Promise<TestingModule> {
		return Test.createTestingModule({
			providers: [],
			imports: [
				HttpModule.register({
					timeout: 10000,
					maxRedirects: 5,
				}),
				MongooseModule.forRoot(global.E2E_MONGO_URI, {
					retryDelay: 2000,
					retryAttempts: 3,
				}),
				...importModules,
			],
			exports: [],
		}).compile()
	}
}
