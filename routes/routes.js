const express = require('express');
const router = express.Router();

const SendGrid = require("../controllers/controllers")

router.post("/addnewuser", SendGrid.addNewUsertoContacts)
router.post("/sendverification", SendGrid.verifyEmail)
router.post("/sendwelcome", SendGrid.welcomeEmail)
router.get("/test", SendGrid.testConnect)

module.exports = router