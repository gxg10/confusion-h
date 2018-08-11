const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Leaders = require('../models/leaders');

const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json());

leadersRouter.route('/')
.get((req,res,next) => {
	Leaders.find({})
	.then((leaders)=>{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(leaders);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next) => {
	Leaders.create(req.body)
	.then((leader) => {
		console.log('Leader created ', leader);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(leader);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.put(authenticate.verifyUser, (req,res,next) => {
	res.statusCode = 403;
	res.end('put operation not supported on /leaders');
})
.delete(authenticate.verifyUser, (req,res,next) => {
	Leaders.remove({})
	.then((resp)=>{
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

leadersRouter.route('/:leaderId')
.get((req,res,next) => {
	Leaders.findById(req.params.leaderId)
	.then((leader) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(leader);
	}, (err) =>next(err))
	.catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next) => {
	res.statusCode = 403;
	res.end('post operation not supported on /leaders/'
		+ req.params.leaderId);
})
.put(authenticate.verifyUser, (req,res,next) => {
	Leaders.findByIdAndUpdate(req.params.leaderId, {
		$set: req.body
	}, {new: true})
	.then((leader)=>{
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(leader);
	},(err) => next(err))
	.catch((err)=> next(err));
})
.delete(authenticate.verifyUser, (req,res,next) => {
	Leaders.findByIdAndRemove(req.params.leaderId)
	.then((resp)=>{
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	},(err)=> next(err))
	.catch((err) => next(err));
});

module.exports = leadersRouter;