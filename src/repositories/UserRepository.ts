import { User } from '../models'
interface ICreate {
	name: string,
  email: string,
	password: string
}
interface IPage {
	size: number,
	page: number
}
class UserRepository {
async findByEmail(email: string) {
	const result = await User.findOne({ email })
	return result
	}
	async create({name, password, email}:ICreate) {
		const result = await User.create({
			name,
			password,
			email,
		})
		return result
	}
	async findAll({ size, page }: IPage) {
		const result = await User.find()
		.skip((page - 1) * size)
		.limit(size)
		.exec()
		return result
	}
	async findById (id: string) {
		const result = User.findById(id)
		return result
	}
	async updatePassword(password: string, id: string) {
		await User.findById(id).updateOne({password})
  }
	async updateName(name: string, id: string) {
		const result =  await User.findById(id).updateOne({name})
		return result
	}
	async delete(id: string) {
		const result = await User.findByIdAndRemove((id)
		)
		return result
	}
}

export { UserRepository }

