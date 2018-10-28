const mongoose = require('mongoose');
const {User} = require('../models/user');
const randomatic = require('randomatic');


const userData = [
    {name : 'Bartek', short_name : 'BJ', email : 'bartek@lean.org', mac_address : '00:00:31:23:1d:d4'},
    {name : 'Tomek', short_name : 'TS', email : 'toemek@lean.org', mac_address : '00:02:31:23:1d:d4'},
    {name : 'Mariusz', short_name : 'MP', email : 'mario@lean.org', mac_address : '01:00:31:23:1d:d4'},
    {name : 'Stefan', short_name : 'ST', email : 'stefan@lean.org', mac_address : '00:00:31:23:1d:d4'},
 ];

 function genUser(){
     let name = randomatic('Aa',6);
     let surname = randomatic('Aa',7);
     let mac = randomatic('Aa0',2)+":"+randomatic('Aa0',2)+":"+randomatic('Aa0',2)+":"+randomatic('Aa0',2)+":"+randomatic('Aa0',2)+":"+randomatic('Aa0',2);

     return {name : `${name} ${surname}`, short_name : name.slice(0,1)+surname.slice(0,1), email : `${name}@lean.org`, mac_address : mac};
 }

async function add_users(){

    await mongoose.connect('mongodb://localhost/kaizen');
    console.log('connected');

    for (let i = 0; i < 10; i++) {
        
        let user = new User(genUser());
        user.save()
        .then(user => {
            console.log(`user ${i} saved successfully`);
            console.log(user);
        })
        .catch(err => {console.log(err.message)});
    }
    
}

add_users();





