const router = require("express").Router()
const { registerUser, loginUser, startRecord } = require("../controllers/user.controller")
const { protect } = require("../middlewares/auth")

router.route('/').get(protect, (req,res) => {
    return res.redirect('/record');
})
router.route("/register").get((req,res) => {
    res.render('signup',{});
}).post(registerUser)
router.route("/login").get((req,res) => {
    res.render('signin',{});
}).post(loginUser)
router.route("/record").get(protect, startRecord)

module.exports = router