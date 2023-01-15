const User = require("../models/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) {
            return res.json({ message: "Someone already has that username", status: false })
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({ message: "Email is already used", status: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        delete user.password
        return res.json({ status: true, user })
    } catch (error) {
        next(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ message: "Incorrect username or password", status: false })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.json({ message: "Incorrect username or password", status: false })
        }
        delete user.password
        console.log('login successful')
        return res.json({ status: true, user })
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "_id"
        ])
        return res.json(users)
    } catch (error) {
        next(error)
    }
}