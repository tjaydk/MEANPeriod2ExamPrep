MEAN  Period 2

>Why would you consider a Scripting Language as JavaScript as your Backend Platform?
----------------------------------------------------------------------------------
-It is simple to use
-Many developers creating packages for javascript, many of these are open source projects
-No compilation necessary

>Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using for example Java/JAX-RS/Tomcat
----------------------------------------------------------------------------------
Pros: When using Node.js and Express as a backend it is very fast and simple to setup a server, its build with webtechnologies which are very common in the programming world which would make maintainance easier in the future as it is easier to find programmers that have language knowledge.
Example on how easy it is to setup a server with node.js and Express.js

	var express = require('express')
	var app = express()
	
	app.get('/', function (req, res) {
  	  res.send('Hello World')
	})
	app.listen(3000)
	
Setting up a server in JAVA consists of Tomcat Server, Servlet and XML files to route request and responses - so much more work

Cons: Some of the cons with using Node.js and Express is the use of middleware, which is necessary to perform tasks, as there are alot of different ones with a big difference in quality and security. Futhermore there are security issues in using Node.js as with using Javascript, and as many start using Node.js and Express for server side, many malicious programmers will try to exploit this. But a taskforce is being established to address the issues with malicious NPM modules to audit modules on NPM.

Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server

There are two ways to handle multicore systems with Node.js - the first solution is to have a central system which handles requests and distributes them to each of their own singlecore virtual machine. This is a fine solution but can be costly on the virualization side when alot of request is to be handled.

The other solution is to use the cluster module included in Node.js 0.8+ which has a master process which creates 'worker' processes that can handle the multicore system use.

>Explain, using relevant examples, concepts related to the testing a REST-API using Node/JavaScript + relevant packages
----------------------------------------------------------------------------------
To make automated test you can use the Mocha testing framework, but the Mocha framework comes wihtou any assertion options, therefore it is necessary to add an assertion module as Chai or similar - here we'll look a Mocha/Chai.
Example of a simple test with Mocha and Chai

	var expect = require('chai');
	var array = [2,3,4];
	describe('#indexOf()', function () {
    	  it('should return -1 when the value is not present', function () {
		//here we use the Chai assertion library to make the specific test
		expect(array.indexOf(1)).to.be.equal(-1);
		expect(array.indexOf(2)).to.not.be.equal(-1);
    	});
    
Here we just test a locale array - but in order to test a .js file you have to module.exports it and then var/require it in your test file.
In order to make test on REST-APIs you can use the Require module to performe the http request towards your server.

	it('should get 200 from request', function(done){
    	  request.get(URL, function(err, res, body){
        	expect(res.statusCode).to.be.equal(200);
        	done();
    	});
	});

In order to ensure that the request is completed before continuing with the next test we will use the Mocha done() function which ensures that the test is put on hold until the done() function is called - remember to call it or your test will stall.

>Explain, using relevant examples, the Express concept; middleware
----------------------------------------------------------------------------------
As explained earlier the Express.js comes out of the box with a limited bundle of functions - therefore we need so called middleware's which can be application level middleware, router level middleware, third-party middleware etc.

#####Application level middleware
Each request to the server is sent through the app.js - so here you are able to make additional functional handling of the request with the app.use() function
Here is an example of an application middleware to handle 404 requests

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
  	  var err = new Error('Not Found');
  	  err.status = 404;
  	  next(err);
	});

The next() function at the end of the app.use() function forwards the request to the next middleware - here we also forwards the err message to be handled in the following middlewares. Its very important to call the next() function or the request will stall just as with the Mocha's done() function. Every request is handled sequential through the app.js file and therefor the order in which the code is implemented is very important. In this case its very important to have the 404 handle in the end of the app.js before the module.exports as it is only to be handle in the case that the request does not refer to any other middleware process.

#####Third-party middleware
If we want to perform more complex request handling we will use third party middlewares which are packages with functionality. You use the npm install to install the middlewares and include them in your app at the beginning of your app.js file - remember that the requests are processed sequential and therefore the order in which you load your middleware is also important. Examples of common used middlewares are body-parser and cookie-parser.

>Explain, using relevant examples, how to implement sessions, and the legal implications of doing this
----------------------------------------------------------------------------------
To handle sessions you can use the express-session middleware which makes it possible to create cookies to store in the clients browser. Use the npm install express-session.
An example of implementing session cookies

	var session = require('express-session');
	app.use(session({
		genid: function(req){
		return genuuid() // uses the UUIDs to generate ID for session
		},
		secret: 'some secret word'
	}));
	
Here we use the UUID to generate a session ID.
Legal implications: if you store user behavior you have to have cookie alert on your webpage. If you only store f.ex. user login then you dont need the cookie alert.

>Compare the express strategy toward (server side) templating with the one you used with Java on second semester.
----------------------------------------------------------------------------------
As on second semester we are now rendering pages on the server side and serving it to the client through the response. In Java we used servlets to handle the request/response objects and rendered the pages there. With express we also use the response to render pages or pass information.
The process is then somewhat similair to the approach used on 2nd semester
We used Java Servlets, jsp server pages and jstl java standard tag library
Here we use express, and one of the following - jade, ejs or handlebars.

>Explain, using a relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the >four CRUD operations programmatically using for example the Request package.
----------------------------------------------------------------------------------
- See the /js/rest.js and /js/restTest.js files to see implementation of the rest with the express.router module and then the restTest.js with a Mocha test framework with Chai assertion library.

>Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.
----------------------------------------------------------------------------------
- See answer 4 and 8 for answers to these questions.

>Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.
----------------------------------------------------------------------------------
To ensure consistency in testing it is a good idea to mock out database or http requests to avoid problems such as no connection or consistency issues. Instead of calling the database consider hardcoding objects or arrays to simulate database data set - this ensures that we can test a function and dont run in to database related problems.
To mock up http we can use the Nock middleware which makes http mocking easy.
Example of a nock mock

	var nock = require('nock');
	var couchdb = nock('http://myapp.iriscouch.com')
        	        .get('/users/1')
                	.reply(200, {
                  	_id: '123ABC',
                  	_rev: '946B7D1C',
                  	username: 'pgte',
                  	email: 'pedro.teixeira@gmail.com'
                 	});
                 
Here we mock a get request to the specific URL and states a build reply. We can set the response statuscode and send an object or a file with the replyWithFile() function.
