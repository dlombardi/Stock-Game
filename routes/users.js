'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

router.post('/register', function(req, res, next){
  console.log('req.body:', req.body);
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Missing required fields username and password.'});
  }

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){
      return res.status(400).json({error: err});
    }
    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Missing required fields username and password.'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){
      return res.status(400).json({error: err});
    }
    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/addStock', function(req, res, next){
  User.findById(req.body.payload._id, function(err, user){
    if(user){
      user.stocks.push(req.body.stock);
      user.balance = parseInt(user.balance) - parseInt(req.body.stock.LastPrice);
      console.log(user);
      user.save();
      res.send(user);
    } else {
      res.send("error", err);
    }
  })
});

router.post('/sellStock', function(req, res, next){
  User.findById(req.body.payload._id, function(err, user){
    if(user){
      user.stocks.map(function(stock, i){
        if(stock.Symbol === req.body.stock.Symbol){
          user.stocks.splice(i, 1);
          user.balance = parseInt(user.balance) + parseInt(req.body.stock.LastPrice);
          user.save()
          res.send(user);
        } else {
          res.send();
        }
      })
    } else {
      res.send("error", err);
    }
  })
});

router.get('/getUser/:id', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    console.log(user);
    res.send(user);
  })
})



module.exports = router;
