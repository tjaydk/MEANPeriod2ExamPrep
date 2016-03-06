'use strict'
var expect = require('chai').expect;
var request = require('request');
var nock = require('nock');
var rest = require('../routes/rest.js');

var URL = "http://localhost:3000/api/number";

var i = 1;

var n = nock('http://localhost:3000/api/number');

describe('quick test', function(){
    beforeEach(function(){
        console.log("Starting new test");
    });
    it('should get 200 from request', function(done){
        request.get(URL, function(err, res, body){
            expect(res.statusCode).to.be.equal(200);
            done();
        });
    });
    it('should add a number to array', function(){
        request.post({url: URL, form: {number: 5}, contentType: "application/json"}, function(err, res, body, done){
            expect(res.statusCode).to.be.equal(200);
            done();
        });
    });
    it('should update the element in the array', function(done){
        request.put(URL+"/2/2", function(err, res, body){
            expect(res.statusCode).to.be.equal(200);
            expect(JSON.parse(res.body).message).to.be.equal("number changed");

            done();
        });
    });
    it('should delete the element in the array', function(done){
            request.del(URL+"/5", function(err, res, body){
                expect(res.statusCode).to.be.equal(200);
                expect(JSON.parse(res.body).message).to.be.equal("number deleted");
                done();
            });
        });
});