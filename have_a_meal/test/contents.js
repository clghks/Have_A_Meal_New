/**
 * Created by ChiHwan on 2014. 4. 19..
 */

// mocha
var mongoose = require('mongoose');
var schema = require('../model/schema');

var assert  = require('assert');
var request = require('request');
var querystring = require('querystring');

var HOST_URL = 'http://localhost:3000';

describe('insert_contents', function(){
    describe('testContents', function(){
        it('insert Contents Result : ', function(done){
            request.post({
                url: HOST_URL + '/insert/contents',
                form:{
                    userId: 'cccc@gmail.com',
                    isPublicity: true,
                    recruitStartDateTime: new Date(2014,3,24),
                    recruitEndDateTime: new Date,
                    foodType: 1,
                    subject: '밥먹어요~~',
                    contents: '모먹을까용?',
                    gpsX:1000.00,
                    gpsY:2222.00,
                    meetingDateTime: new Date,
                    count: 10,
                    fee: 20000,
                    joinUsers: 'aaaaa',
                    attachedFile: 'hi~~'
                }},
                function(error, response, body){
                    assert.equal('Success', body);
                    done();
                });
        })
    })
})

describe('select_contents', function(){
    describe('testContents', function(){
        it('select Contents Result : ', function(done){
            var param = {userId: 'cccc@gmail.com'};
            request.get(HOST_URL + '/select/contents?' + querystring.stringify(param), function(error, response, body){
                assert.equal('Success', body);
                done();
            });
        })
    })
})

describe('delete_contents', function(){
    describe('testContents', function(){
        it('select Contents Result : ', function(done){
            var param = {userId: 'cccc@gmail.com'};
            request.del(HOST_URL + '/delete/contents?' + querystring.stringify(param), function(error, response, body){
                assert.equal('Success', body);
                done();
            });
        })
    })
})

describe('insert_replay', function(){
    describe('testContents', function(){
        it('insert Contents Result : ', function(done){
            request.post({
                    url: HOST_URL + '/insert/replay',
                    form:{
                        userId: 'cccc@gmail.com',
                        egisterDateTime: new Date(2014,3,24),
                        modifiyDateTime: new Date,
                        parentContentsId: '333333'
                    }},
                function(error, response, body){
                    assert.equal('Success', body);
                    done();
                });
        })
    })
})

describe('delete_replay', function(){
    describe('testContents', function(){
        it('select Contents Result : ', function(done){
            var param = {userId: 'cccc@gmail.com'};
            request.del(HOST_URL + '/delete/replay?' + querystring.stringify(param), function(error, response, body){
                assert.equal('Success', body);
                done();
            });
        })
    })
})

describe('select_replay', function(){
    describe('testContents', function(){
        it('select Contents Result : ', function(done){
            var param = {parentContentsId: '333333'};
            request.get(HOST_URL + '/select/replay?' + querystring.stringify(param), function(error, response, body){
                assert.equal('Success', body);
                done();
            });
        })
    })
})
