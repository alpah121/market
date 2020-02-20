var express = require('express');
var router = express.Router();
var passport = require("passport");
var navbar = [];

var messages = require('./messages');
var crud = require('./crud');

function getSQLResponse(fallback, sql)
{
//make query
connection.query(sql, (error, results, fields) => {
	//handle error
	if (error) {}
	//return results
	
	});
}


router.get('/', function(req, res) {
	res.render('home');
	});


router.get('/signUp', (req, res) => {
res.render('signUp');	
});

router.get('/login', (req, res) => {
res.render('login');	
});

router.post('/signUp', passport.authenticate('local.signUp', {
successRedirect: '/login',
failureRedirect: '/signUp',
failureFlash: true	
}));

router.post('/login', passport.authenticate('local.login', {
successRedirect: '/dashboard',
failureRedirect: '/login',
failureFlash: true	
}));

router.get('/logout', isLoggedIn, function(req, res, next) {
req.logout();
res.redirect('/');	
});

router.get('/requests', crud.read);

router.get('/request', crud.detail);

router.post('/request/new', isLoggedIn, crud.create);

router.post('/request/update', crud.update);

router.get('/request/delete', crud.delete);

router.get('/dashboard', crud.dashboard);	


router.get('/messages', messages.read);

router.get('/message', messages.detail);

router.post('/message/new', messages.create);

router.get('/message/delete', messages.delete);

function isLoggedIn(req, res, next)
{
if (req.isAuthenticated())
	{
	return next();		
	}
else
	{
	console.log("user not logged in");
	res.redirect('/');	
	}
}

module.exports = router;
