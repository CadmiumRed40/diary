const express = require('express')
const router = express.Router()

//@desc login/landing page
//@route GET /

router.get('/' , (req,res)=> {
    res.render('login' ,{ //"send" sends back data and RENDER sends HTML 
    layout: 'login',
    })
})

//@desc Dashboard
//@route GET /dashboard

router.get('/dashboard' , (req,res)=> {
    res.render('dashboard')
})

module.exports = router