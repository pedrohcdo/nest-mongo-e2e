import { User } from '../user/user.model';
import { ModelMock } from './model-mock'

// Mocks opcionais para tipagens

// Utilizado para embrulhar os modelos genericos, para um melhor entendimento ler a explicação localizada em "./model-mocks.ts"
// Adicionar aqui os mocks de todos modelos como no exemplo abaixo
export class UserMock extends ModelMock<User> {}
