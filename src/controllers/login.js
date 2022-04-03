const JWT = require('../utils/jwt.js')
const path = require('path')

const POST = (req, res) => {
	try {
		let { username } = req.body
		const { file } = req.files
		const { users } = process.db
		const { viewer } = process.db

		username = username?.trim()

		if(process.db.gameStarted) {
			throw new Error("Game started! You can join to next game!")
		}

		if(
			!username ||
			username.length > 50
		) {
			throw new Error("Invalid username")
		}

		if(!file) {
			throw new Error("file is required!")
		}

		if(!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
			throw new Error("Invalid file mime type!")
		}

		if(file.size > 5 * 1024 * 1024) {
			throw new Error("File is too large!")
		}

		if(users.find(user => user.username == username)) {
			throw new Error("The user already exists!")
		}

		const fileName = Date.now() + file.name.replace(/\s/g, "")
		const filePath = path.join(__dirname, '../', 'uploads', fileName)

		file.mv(filePath)
        
		const newUser = {
            userId: users.length ? users.at(-1).userId + 1 : 1,
			turn: users.length === 0,
			userImg: fileName,
			username,
		}
        
        if ( users.length + 1 < 3 ) {
            // const admin = users.length === 0
            const token = JWT.sign({ userId: newUser.userId })
    
            users.push(newUser)
    
            console.log(users)
    
            return res
                .status(200)
                .cookie('token', token)
                .json({ 
                    status: 200,
                    message: "You joined to game!",
                })
        }else{
            viewer.push(newUser)
    
            console.log(viewer)
    
            return res
                .status(200)
                .cookie('token', null)
                .json({ 
                    status: 200,
                    message: "You joined to game for viewer!",
                })
        }

	} catch(error) {
		return res.status(400).json({
			status: 400,
			message: error.message,
		})
	}
}

const GET = (req, res) => res.render('login')

module.exports = {
	POST,
	GET
}