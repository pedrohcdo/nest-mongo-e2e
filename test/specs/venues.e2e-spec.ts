import { INestApplication } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import request from 'supertest'
import { Model } from 'mongoose'
import { E2EConnectionType, TestUtils } from '../../src/utils/test-utils'

import { StubFactory } from '../../src/repository/__mocks__/stubs-data'
import { User } from 'src/repository/user/user.model'
import { UsersModule } from 'src/samples/users/users.module'
import { getModelToken } from '@nestjs/mongoose'

describe('UsersModule (e2e)', () => {
	let app: INestApplication

	//
	let userModel: Model<User>
	let httpService: HttpService

	//
	beforeAll(async () => {
		// Nesse teste, o ideal é mocar somente serviços externos ou indesejados.
		// Importante: Os modelos não são mocados.

		// O modulo criado utiliza uma conexão local com o banco em memoria criado no tempo de inicialização dos testes.
		// Lembrando que no final de todos os testes e2e o banco em memoria sera finalizado.
		const module = await TestUtils.createE2EModule(
			UsersModule,
			// Esse parametro é opcional
			// Coloque externos aqui os serviços que deseja mocar, ex:
			[
				// [ PartnerApiService, PartnerApiServiceMock ]
			],
			E2EConnectionType.All // Because the Repository make connections with legacy and menu manager database models
		)

		//
		app = module.createNestApplication()

		// Captura o modelo do venus
		// obs: (Nesse testes os modelos não são mocados, todos possuem conexão com banco)
		userModel = module.get<Model<User>>(getModelToken(User.name))

		// Esse serviço é providenciado por padrão na criação do modulo de testes
		httpService = module.get<HttpService>(HttpService)

		//
		await app.init()
	})

	describe('with stub sample', () => {
		// Cria um esboço
		const userStub = StubFactory.createForUser()

		// Salva o esboço no banco
		beforeAll(async () => {
			await new userModel(userStub).save()
		})

		//
		it(`/xxx/email/${userStub.email} (GET) should return the email`, async () => {
			//
			await request(app.getHttpServer())
				.get(`/xxx/email/${userStub.email.toString()}`)
				.expect(200)
				.expect('sample@gmail.com')
		})

		// Removendo esboço do banco
		afterAll(async () => {
			await userModel.deleteOne({ _id: userStub.email })
		})
	})
})
