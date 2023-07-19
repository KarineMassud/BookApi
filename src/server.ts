import express, { Application, NextFunction, Request, Response } from 'express'
import { UserRoutes } from './routes/user_routes'
import { DbConnection } from './database'
import { BooksRoutes } from './routes/books_routes'
import swaggerUi from 'swagger-ui-express'
import { SwaggerSpec } from './utils/swagger'



const app: Application = express()
const userRoutes = new UserRoutes().getRoutes()
const booksRoutes = new BooksRoutes().getRoutes()
const database = new DbConnection()

//Converte todas as respostas em json
app.use (express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/user', userRoutes)
app.use('/books', booksRoutes)
app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(SwaggerSpec))

// Converte algumas informação para não haver quebras
//www.example.com?text==Olá%20Mundo

database.connect()
app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof Error) {
			return response.status(400).json({
				message: err.message,
			})
		}
		return response.status(500).json({
		status: 500,
		message: 'Internal server error.'
		})
	}
)

app.listen(3333, () => console.log('server is running'))
