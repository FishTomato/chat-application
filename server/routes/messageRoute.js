const { addMessage, getAllMessages } = require('../controllers/messageController')

const router = require("express").Router()

router.post("/addMessage", addMessage)
router.post("/getmessage", getAllMessages)


module.exports = router