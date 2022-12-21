import { HttpModule } from '@nestjs/axios'
import { CacheModule, DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing'
import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { CacheServiceMock, ConfigServiceMock } from '../config/mocks/environment.mock'
import { CacheService } from '../cache/cache.service'
import { ModelMock } from '../repository/__mocks__/model-mock'
import { genTestUri } from '../../test/global-e2e-consts'

type ModuleType = Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference

export enum E2EConnectionType {
	Legacy = 'Legacy',
	MenuManager = 'MenuManager',
	All = 'All'
}

export class TestUtils {
	/**
	 * Create a test module by modifying the desired models and services.
	 *
	 * @param importModule desired module
	 * @param modelsName It is possible to inform which models will be mocked in this test, there are two ways to provide the mocks for the models, they are:
	 * 	```"modelName" | ["modelName", mockObject]``` and can be interleaved, eg: ```[ModelA.name, ModelB.name, [ModelC.name, { }]]```.
	 * The models that not provided will be mocked with and default ModelMock instance.
	 * @param overrideProviders The desired services that will be mocked in the dependency tree of the ```importModule```, eg: ```[[ServiceTest, ServiceTestMock], ..]```
	 * @returns Return the test module
	 */
	static async createMockedModelsModule(
		importModule: ModuleType,
		modelsName: (string | [string, Type<ModelMock<any>>])[] = [],
		overrideProviders: [any, any][] = []
	) {
		const builder: TestingModuleBuilder = Test.createTestingModule({
			providers: [],
			imports: [
				HttpModule,
				ConfigModule.forRoot({
					isGlobal: true,
				}),
				CacheModule.register({
					isGlobal: true,
				}),
				importModule,
			],
		})
			.overrideProvider(ConfigService)
			.useClass(ConfigServiceMock)
			.overrideProvider(CacheService)
			.useClass(CacheServiceMock)
			.useMocker(token => {
				
			})
		for (const overrideProvider of overrideProviders) {
			builder.overrideProvider(overrideProvider[0]).useClass(overrideProvider[1])
		}

		for (const modelName of modelsName) {
			if (typeof modelName === 'string') {
				builder.overrideProvider(modelName).useClass(ModelMock)
			} else {
				builder.overrideProvider(modelName[0]).useClass(modelName[1])
			}
		}

		return await builder.compile()
	}

	/**
	 * Create a e2e test module mocking desired services.
	 *
	 * @param importModule desired module
	 * @param overrideProviders The desired services that will be mocked in the dependency tree of the ```importModule```, eg: ```[[ServiceTest, ServiceTestMock], ..]```
	 * @returns Return the test module
	 */
	static async createE2EModule(
		importModule: ModuleType,
		overrideProviders: [any, any][],
		connection: E2EConnectionType = E2EConnectionType.All
	): Promise<TestingModule> {

		// Prepare module
		const mongoModules: DynamicModule[] = [];

		if([E2EConnectionType.Legacy, E2EConnectionType.All].indexOf(connection) !== -1) {

		} 
		
		if([E2EConnectionType.MenuManager, E2EConnectionType.All].indexOf(connection) !== -1) {
	
		}

		//
		const mockedConfig = {
			uri: genTestUri(),
			retryDelay: 2000,
			retryAttempts: 3,
		};

		const builder: TestingModuleBuilder = Test.createTestingModule({
			providers: [],
			imports: [
				HttpModule.register({
					timeout: 10000,
					maxRedirects: 5,
				}),
				ConfigModule.forRoot({
					isGlobal: true
				}),
				CacheModule.register({
					isGlobal: true,
				}),
				...mongoModules,
				importModule,
			],
			exports: [
			]
		})
			.overrideProvider(ConfigService)
			.useValue({
				get(key: string) {
					return mockedConfig[key]
				}
			})
			.overrideProvider(CacheService)
			.useClass(CacheServiceMock)

		for (const overrideProvider of overrideProviders) {
			builder.overrideProvider(overrideProvider[0]).useClass(overrideProvider[1])
		}

		return await builder.compile()
	}
}
