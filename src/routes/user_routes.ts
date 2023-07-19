import { Router } from 'express'
import { userController } from '../controllers/userController'

class UserRoutes {
	private router: Router
	private userController: userController
	constructor() {
		this.router = Router()
		this.userController = new userController()
	}
	getRoutes(){
		/**
		 * @swagger
		 *   /user
		 *     post:
		 *       summary: Create user
		 *       description: Create user
		 *       requestBody:
		 *         content:
		 *           application/json:
		 *             schema:      # Request body contents
		 *               type: object
		 *               properties:
		 *                name:
		 *                  type: string
		 *                email:
		 *                  type: string
		 *                password:
		 *                  type: string
		 *               example:  # Sample object
		 *                 name: 'Karine Massud'
		 *                 email: 'karine@teste.com'
		 *                 password: '123456'
		 *      responses:
		 *        200:
		 *          description: OK
		 *        400:
		 *          description:'Bad request'
		 *        401:
		 *          description: 'Unauthorized'
		 *
		 */

		this.router.post('/', this.userController.store.bind(this.userController))
		this.router.get('/', this.userController.index.bind(this.userController))
		this.router.get('/:id', this.userController.show.bind(this.userController))
		this.router.put('/:id', this.userController.update.bind(this.userController))
		this.router.delete('/:id',
		this.userController.delete.bind(this.userController))
    return this.router


	}
}

export { UserRoutes }




