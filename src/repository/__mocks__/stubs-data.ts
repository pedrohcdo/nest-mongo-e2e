import { User } from '../user/user.model'

// Classe utilizada para gerar esboços de todos os tipos para os testes
export class StubFactory {
	// Cria um esboço para ser utilizado nos testes
	static createForUser(): User {
		return {
			name: "Sample",
			email: 'sample@gmail.com',
		}
	}
}
