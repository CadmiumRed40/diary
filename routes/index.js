const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth') //middleware that ensures once youre signed in/logged in you won't be redirected to the login page(ensureAuth) but also be able to see the login page while not logged in(ensureGuest)

const Story = require('../models/story')
//@desc login/landing page
//@route GET /

router.get('/', ensureGuest , (req,res)=> {
    res.render('login' ,{ //"send" sends back data and RENDER sends HTML 
    layout: 'login',
    })
})

//@desc Dashboard
//@route GET /dashboard

router.get('/dashboard', ensureAuth, async (req,res)=> {
    try {
        const stories = await Story.find({ user: req.user.id }).lean() //
        res.render('dashboard',{
            name: req.user.firstName,
            stories
    })
    }catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router