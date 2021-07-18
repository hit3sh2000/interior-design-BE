require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const cloudinary = require('cloudinary');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

module.exports = {
    Register: async (req, res) => {
        try {
            const { name, email, password, avatar, age, contact, address, gender } = req.body;
            const user = new User();
            user.name = name;
            user.email = email;
            user.password = password;
            user.avatar = avatar;
            user.age = age;
            user.contact = contact;
            user.address = address;
            user.gender = gender;
            await user.save();

        } catch (err) {
            res.send(err)
            console.log(err);
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.find();
            res.send(user);
        } catch (err) {
            res.send(err)
        }
    },
    Login: async (req, res) => {
        try {
            var email = req.body.email
            var password = req.body.password

            const user = await User.findOne({
                email: email
            })
            if (user == null) {
                return res.status(400).send('cannot find user')
            }
            const checkpassword = await bcrypt.compare(password, user.password);
            if (checkpassword) {
                let payload = { contact: req.body.contact, name: user.name };
                let token = jwt.sign(payload, 'process.env.SUPER_SECRET');
                return res.json({ auth: true, message: "Allowed", token: token, result: user })
            } else {
                return res.json({ auth: false, message: "Not allowed" })
            }
        } catch (err) {
            return res.json({ auth: false, err, message: "Not allowed" })
        }
    },
}