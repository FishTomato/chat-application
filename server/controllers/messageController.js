const messageModel = require("../models/messageModel");
const Message = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: {
                text: message
            },
            users: [from, to],
            sender: from,
        })
        if (data) {
            return res.json({ message: "Message added succesfully" })
        }
        else return res.json({ message: "Failed to add Message" })
    } catch (error) {
        next(error)
    }
}
module.exports.getAllMessages = async (req, res, next) => {
    try {
        const {from ,to} = req.body
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            }
        }).sort({updatedAt: 1})
        const projectedMessage = messages.map((message)=>{
            return {
                fromSelf:message.sender.toString() === from,
                message: message.message.text,
            }
        })
        return res.json(projectedMessage)
    } catch (error) {
        next(error)
    }
}