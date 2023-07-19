import mongoose from 'mongoose'

class DbConnection {
	async connect() {
		try {
			await mongoose.connect(
				'mongodb+srv://karinegodeiro123:qlLdRRG1gpKSvF5J@cluster0.y7cogug.mongodb.net/bookapi'
			)
			console.log('connect to database')

		} catch (error) {
			console.log('Error to connect database')

		}
	}
}

export { DbConnection }

