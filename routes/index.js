const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth');
const {User} = require('../models/user');

/* GET home page. */
router.get('/', auth, async function(req, res) {

    console.log(req.user);

    if(!req.user){
        res.render('register', { title: 'Rejestracja' });
    } else if(req.user.admin){
        let users = await User.find();
        res.render('admin', { title: 'Administracja', users: users });
    } else {
        res.render('index', { title: 'Kaizen' });
    }
});

router.delete('/', auth, async function(req, res){

    console.log(req.body._id);
    let user = await User.findByIdAndRemove(req.body._id);
    res.status(200).send({ success: true,_id : req.body._id, object: user });
});

module.exports = router;
