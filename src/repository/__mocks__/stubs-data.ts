import { User } from '../user/user.model'

export class StubFactory {
	
	static createForUser(): User {
		return {
			name: "Sample",
			email: 'sample@gmail.com',
		}
	}
}
