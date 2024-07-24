const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json('Server is running... 🚀')
})

router.use('/auth', require('./auth'))

module.exports = router