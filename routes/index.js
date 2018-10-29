const express = require('express');
const router = express.Router();
const {auth, mac} = require('../middlewares/auth');
const {User, validate} = require('../models/user');

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

router.get('/register',auth, async function(req, res) {

   res.render('register', { title: 'Rejestracja' });
});

/**
 * Register an new user, get mac by IP address and then register
 */
router.post('/', mac, async function(req,res){

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = new User(req.body);

    try{
        await user.save();
    } catch(e){
        console.log(e);
        return res.status(400).send(e.message);
    }
    

    res.status(200).send({success: true, user: user});
});

/**
 * Only for admin: of this server- deletes user from db
 */
router.delete('/', auth, async function(req, res){

    console.log(req.body._id);
    let user = await User.findByIdAndRemove(req.body._id);
    res.status(200).send({ success: true,_id : req.body._id, object: user });
});

module.exports = router;
