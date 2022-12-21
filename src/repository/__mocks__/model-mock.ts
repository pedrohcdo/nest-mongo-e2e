/**
 * Classe utilizida para mocar os modelos.
 * Os métodos (find(), findOne(), ...) não são estaticos, podendo ser utilizados com value no override providenciado pelo nest, ex:
 *
 * class ModelTestMock extends ModelMock<any> {}
 *
 * //
 * const test = new ModelTestMock();
 * test.setEntity("test mock")
 *
 * // ... assim o modelo seria sobrescrevido na etapa de inicialização do modulo de teste
 *
 * // Quando o modelo for injetado em algum serviço o mesmo utilizara e recebera o valor providenciado na construção desse mock
 * const result = await test.find().select()....
 * console.log(result) // "test mock"
 */

//
export class ModelStrem<T> implements PromiseLike<T> {
	constructor(private readonly entity: T) {}

	then(onfulfilled?: (value: T) => any, onrejected?: (reason: any) => any): any {
		onfulfilled(this.entity)
	}

	exec() {
		return this
	}

	select() {
		return this
	}

	sort() {
		return this
	}

	lean() {
		return this
	}
}

//
export class ModelMock<T> {
	protected entity: T

	setEntity(entity: T) {
		this.entity = entity
	}

	save() {
		return this
	}

	find() {
		return new ModelStrem(this.entity)
	}

	findOne() {
		return new ModelStrem(this.entity)
	}

	findById() {
		return new ModelStrem(this.entity)
	}

	findOneAndUpdate() {
		return new ModelStrem(this.entity)
	}

	count() {
		return 1
	}

	update() {
		return new ModelStrem(this.entity)
	}

	updateOne() {
		return new ModelStrem(this.entity)
	}

	remove() {
		return new ModelStrem(this.entity)
	}

	findByIdAndRemove() {
		return new ModelStrem(this.entity)
	}

	checkCooldown() {
		return new ModelStrem(this.entity)
	}
}
