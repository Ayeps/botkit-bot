/**
 * Created by Softmasters on 6/7/2016.
 */


var client = require('./lib/client')
var async = require('async');
var is = require('is2');
var tables = '';
var playerId = 0;

//client.login("Danny", function (response) {
//    //tables = response;
//
//    console.log(response);
//    playerId = response.player.id;
//});
//
//var text = 25;
//client.joinTable(playerId, 1, function (response) {
//    console.log(respnse);
//    //playerId = 2;
//});

async.series(
    [
        function (cb) {
            client.login("Danny", function (response) {
                //tables = response;
                playerId = response.player.id;
                console.log(playerId);
                return cb(playerId);
            })
        },
        client.joinTable(function (playerId) {
            return parseInt(playerId);
        }, 1, function (response) {

            console.log(response);
            //playerId = 2;
        })
    ],
    function (err) {
        console.log(err);
    }
);

//console.log("outside async"+playerId);