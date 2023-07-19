import { NextFunction, Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'

class AuthMiddleware {
	private usersRepository: UserRepository
	constructor() {
		this.usersRepository = new UserRepository()
	}
	async auth (request: Request, response: Response, next: NextFunction) {
		const authHeader: string = request.headers.email as string
		if (!authHeader) {
			return response.status(401).json({
				code: 'token.missing',
				message: 'Token missing'
			})
		}
		const findUser = await this.usersRepository.findByEmail(authHeader)

		if (!findUser) {
			return response.status(400).json({
				code: 'token.not_found',
				message: 'Token not found',
			})
		}
		request.user_id = findUser.id
		return next()
	}

}

export { AuthMiddleware }
