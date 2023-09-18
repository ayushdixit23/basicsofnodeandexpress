const express = require('express')
const fs = require('fs')
const path = require('path')
const myPath = path.join(__dirname, "file")
const app = express()
const HTMLPath = path.join(__dirname, "index.html")
const HTMLPaths = path.join(__dirname, "public/index.html")
const port = process.env.PORT || 3000;

// creating a file

fs.writeFileSync("ayush.text", "Simple text file for testing")
fs.writeFileSync(myPath + "/fceghj.txt", "complex text file for testing")
for (let i = 0; i < 5; i++) {
	fs.writeFileSync(myPath + "/myfile" + i + ".txt", "files created by loops this is my " + i + " file")
}

app.get('/', (req, res) => {
	res.send("<h1>hello everyone</h1>")
})

// reading a file

fs.readFile(myPath + "/myfile.txt", "utf8", (err, item) => {
	console.log(item)
})

// renaming a file

fs.rename(myPath + "/apple.txt", myPath + "/file.txt", (err) => {
	if (!err) {
		console.log("files renamed")
	}
})

// updating a file

fs.appendFile(myPath + "/myfile.txt", " this are extended text.", (err) => {
	if (!err) {
		console.log("file updated")
	}
})

// deleting a file

fs.unlinkSync(myPath + "/fceghj.txt")

// basic routing

app.get('/about', (req, res) => {
	res.send("hello about")
	console.log(req.params())
})

// Sending a HTML file

app.get("/", (req, res) => {
	res.sendFile(HTMLPath, (err) => {
		if (!err) {
			res.send("HTML file uploaded on web")
		}
	})
})

app.get("/public", (req, res) => {
	res.sendFile(HTMLPaths, (err) => {
		if (!err) {
			res.send("HTML file uploaded on web")
		}
	})
})

// Routing and Middleware

const middleWare = (req, res, next) => {
	if (!req.query.age) {
		res.send("Enter Your Age Params")
	} else if (req.query.age <= 10) {
		res.send("You need to be Above 10")
	} else {
		next()
	}
}

app.get('/ayush', middleWare, (req, res) => {
	res.send("<h1>my name is ayush</h1>")
})

app.listen(port);

