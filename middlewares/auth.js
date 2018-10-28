const {User} = require('../models/user');
const arp = require('node-arp');

async function auth(req, res, next){

    let ip = req.ip.split(':').pop();
    req.user = {};
    if( ip.trim() == '1'){
        req.user.admin = true;
        next();
        return;
    }

    try {
        arp.getMAC(ip, async (err,mac)=>{
            if(!err){ 
                  //fecht user data from db
                req.user = await User.findOne({mac_address : mac});
                
            } 
        }); 
    } catch(e){
       
    }

    next();
}




module.exports.auth = auth;