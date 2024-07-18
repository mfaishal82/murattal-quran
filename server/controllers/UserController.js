const { compareSync } = require('bcryptjs')
const { User } = require('../models')
const { signToken } = require('../helpers/jwt')

module.exports = {
    async register(req, res, next) {
        try {
            // console.log(req.body);
            const { fullName, userName, email, password } = req.body

            if (!userName) {
                return res.status(400).json({ error: 'userName is required' });
            }

            if (!fullName) {
                return res.status(400).json({ error: 'fullName is required' });
            }
            if (!email) {
                return res.status(400).json({ error: 'email is required' });
            }
            if (!password) {
                return res.status(400).json({ error: 'password is required' });
            }

            const user = await User.create({ fullName, userName, email, password });

            res.status(201).json({
                fullName: user.fullName,
                userName: user.userName,
                email: user.email
            });
        } catch (error) {
            // console.log(error)
            res.status(error.status || 500).json({message: error.message || "Internal server error"})            
        }
    },
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log('Login attempt:', email); // Added log here

            if (!email || !password) throw { status: 400, message: "Email & password is required" };

            let user = await User.findOne({
                where: {
                    email
                }
            });

            if (!user || !compareSync(password, user.password)) throw { status: 401, message: "Email or password is incorrect" };
            
            const token = signToken({ id: user.id, email: user.email });
            
            res.status(200).json({ access_token: token });
        } catch (error) {
            console.log('Login error:', error); // Added log here
            res.status(error.status || 500).json({ message: error.message || "Internal server error" });
        }
    },
    async post(req, res, next) {
        try {
        const user = await User.create(req.body)
        res.send(user)
        } catch (err) {
        res.status(500).send({
            error: 'An error has occured trying to create the user'
        })
        }
    },
    async put(req, res) {
        try {
        await User.update(req.body, {
            where: {
            id: req.params.userId
            }
        })
        res.send(req.body)
        } catch (err) {
        res.status(500).send({
            error: 'An error has occured trying to update the user'
        })
        }
    },
    async remove(req, res) {
        try {
        const userId = req.params.userId
        const user = await User.findOne({
            where: {
            id: userId
            }
        })
        if (!user) {
            return res.status(403).send({
            error: 'The user information was not found'
            })
        }
        await user.destroy()
        res.send(user)
        } catch (err) {
        res.status(500).send({
            error: 'An error has occured trying to delete the user'
        })
        }
    }
}