const express = require('express');
const bodyParser = require('body-parser');

const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json());

leadersRouter.route('/')
.all((req,res,next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
	next();
})
.get((req,res,next) => {
	res.end('Will send all th leaders to you!');

})
.post((req,res,next) => {
	res.end('will add the leader: ' + req.body.name + 
		'with details: '+ req.body.description);
})
.put((req,res,next) => {
	res.statusCode = 403;
	res.end('put operation not supported on /leaders');
})
.delete((req,res,next) => {
	res.end('deleting all the leaders');

});

leadersRouter.route('/:leaderId')
.get((req,res,next) => {
	res.end('Will send details of this leader!: ' +
		req.params.leaderId + 'to you');

})
.post((req,res,next) => {
	res.statusCode = 403;
	res.end('post operation not supported on /leaders/'
		+ req.params.leaderId);
})
.put((req,res,next) => {
	res.write('Updating the leaders:'+ req.params.leaderId+ '\n');
	res.end('will update the leaders: ' + req.body.name + 
		'with details: '+ req.body.description);
})
.delete((req,res,next) => {
	res.end('deleting leader: ' + req.params.leaderId);

});

module.exports = leadersRouter;