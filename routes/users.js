var express = require('express');
var userService = require('../service/userService');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUser',function(req,res){
  var user = req.session.user;
  if(user){
    res.send(user);
  }else{
    res.send("");
  }
});

router.get('/logOut',function(req,res){
  console.log('out');
  req.session.user = null;
  res.send("");
});

router.post("/findUser",function(req,res){
  var username = req.body.username;
  userService.findUser(username,function(data){
    //console.log(data);
    res.send(data);
  });

});

router.post('/addUser',function(req,res){
  var username = req.body.username;
  var telephoneN = req.body.telephoneN;
  var realName = req.body.realName;
  var password = req.body.password;
  userService.addUser(username,telephoneN,realName,password,function(data){
    res.send(data);
  })
});

router.post('/login',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  //console.log(username,password)
  userService.login(username,password,function(data){
    if(data.length>0){
      req.session.user = data[0];
    }
    res.send(data)
  })
});

module.exports = router;
