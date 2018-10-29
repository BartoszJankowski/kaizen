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
            next(); 
        }); 
    } catch(e){
        next();
    }

   
}

async function mac(req,res,next)
{
    // req.body.mac_address = '00:24:34:34:54:f3';
    // next();
    // return;
    let ip = req.ip.split(':').pop(); 
    try {
        arp.getMAC(ip, (err,mac)=>{
            if(!err){ 
                  //fecht user data from db
                req.body.mac_address = mac;
            } 
            next();
        }); 
    } catch(e){
       console.log(e);
       next();
    }

}



module.exports.auth = auth;
module.exports.mac = mac;