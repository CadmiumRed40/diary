const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth') //middleware that ensures once youre signed in/logged in you won't be redirected to the login page(ensureAuth) but also be able to see the login page while not logged in(ensureGuest)

const Story = require('../models/story')
//@desc show add page
//@route GET /stories/add

router.get('/add', ensureAuth , (req,res)=> {
    res.render('stories/add')
})

//@desc process add form
//@route POST /stories

router.post('/', ensureAuth , async (req,res)=> {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router