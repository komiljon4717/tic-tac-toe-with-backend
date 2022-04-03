const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

process.db = {}
process.db.users = []
process.db.viewer = []
process.db.gameStarted = false
// process.db.remainingTime = 0




app.set('views', path.join(__dirname, 'public'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use((req, res, next) => {
	res.render = function (fileName) {
		return res.sendFile(path.join(app.get('views'), fileName + '.html'))
	}
	return next()
})



const loginRouter = require('./routes/login.js')

app.use(loginRouter)




app.listen(PORT, () => console.log("server is running on 5000"))




























/*
users
    userId username profileImg turn
chars
	userId text
gameStarted



API architecture


/ login (POST)
		* request   [username, img]
		* response  [userId, token]
		* tasks
			* validate requset body
			* check username exists
			* save img
			* push new user to users array
			* generate token
			* send response

/getInfo (GET)
    * request [token]
    * response [users, isTurn currentUser {userId, profileImg}]
    * tasks
        * check token
        * check isTurn
        * send response







/start (GET) 
		* request [token]
		* response [token]
		* tasks
			* check token
			* check users array length min: 2
			* set startGame

/chars      (POST) 
		* request  [token, char]
		* response [ok: boolean message: char]
		* tasks 
			* validate chars
			* check token
			* check char is used or not and word compability
			* push new char to chars array
			* set false to current user
			* set true to next user


*/