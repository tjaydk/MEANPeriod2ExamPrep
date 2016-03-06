'use strict'
var express = require('express');
var router = express.Router();

//this is our test data set
var testArray = [1, 2, 3, 7, 5, 5];

//=====================
//CRUD OPERATIONS
//=====================

//CREATE
//-----------
router.post('/number', function(req, res, next){
    testArray.push(parseInt(req.body.number));
});

//READ
//-----------
router.get('/number', function(req, res, next) {
    res.json({number: testArray});
});


//UPDATE
//-----------
router.put('/number/:i/:n', function(req, res, next){
    var index = testArray.indexOf(parseInt(req.params.i));
    console.log(index);
    if(index !== -1) {
        testArray[index] = parseInt(req.params.n);
    } else {
        res.json({error: "something went wrong"});
    }
    res.json({message: "number changed"});
});

//DELETE
//-----------
router.delete('/number/:i', function(req, res, next){
    var index = testArray.indexOf(parseInt(req.params.i));
    console.log(index);
    if(index !== -1) {
        testArray.splice(index, 1);
    } else {
        res.json({error: "something went wrong"});
    }
    res.json({message: "number deleted"});
});



module.exports = router;