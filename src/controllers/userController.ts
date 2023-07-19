import { NextFunction, Request, Response } from 'express'
import { compare, hash } from 'bcrypt'
import { UserRepository } from '../repositories/UserRepository'





class userController{
	private userRepository: UserRepository
	constructor() {
		this.userRepository = new UserRepository()
	}

	async index(request: Request, response: Response, next: NextFunction) {
		//buscar todos
		const { page, size } = request.query
		const DEFAULT_PAGE = 1
		const DEFAULT_SIZE = 10

		const pageNumber = page ? parseInt(page as string, 10) : DEFAULT_PAGE
		const pageSizeNumber = size ? parseInt(size as string, 10)  : DEFAULT_SIZE
		try {
			const result =  await this.userRepository.findAll({
				page: pageNumber,
				size: pageSizeNumber
			})
			return response.json(result)
		} catch (error) {
			next(error)

		}
	}
	async show (request: Request, response: Response, next: NextFunction) {
		//buscar apenas um
		const { id } = request.params
		try {
			const result = await this.userRepository.findById(id)
			return response.json(result)

		} catch (error) {
			next(error)

		}
	}
	async store (request:Request, response:Response, next:NextFunction) {
		//criar
		const {name, password, email} = request.body
		try{
			const findUser = await this.userRepository.findByEmail(email)

			if (findUser) {
				throw new Error ('User already exists')
			}
			const hashPassword = await hash(password, 10)
			const createUser = await this.userRepository.create({
				name,
				password: hashPassword,
				email,
			})
			return response.json(createUser)
    } catch (error) {
			next(error)

		}
	}
	async update (request: Request, response: Response, next: NextFunction) {
		//atualizar
		const { id } = request.params
		const { name, password, oldpassword} =  request.body
		try {
			const findUser = await this.userRepository.findById(id)
			if (!findUser) {
				throw new Error('user not found')
			}


			if (password && oldpassword && findUser.password) {
				console.log('teste', password, oldpassword, findUser.password)
				const passwordMatch = await compare(oldpassword, findUser.password)
				if (!passwordMatch) {
					throw new Error ('password doesn`t match')
				}
				const hashPassword = await hash(password, 10)


				await this.userRepository.updatePassword(hashPassword, id)

			}


			if (name) {

				await this.userRepository.updateName(name, id)
			}
			return response.json({message: 'updated successfully'})

		} catch (error) {
			next (error)

		}
	}

	async delete (request: Request, response: Response, next: NextFunction) {
		const { id } = request.params
		try {
			const findUser = await this.userRepository.findById(id)

			if (!findUser) {
				throw new Error('User not found.')
			}

			const result = await this.userRepository.delete(id)
			return response.json(result)

		} catch (error) {
			next(error)
		}
	}
}

export { userController }

