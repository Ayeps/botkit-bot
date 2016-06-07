/**
 * Created by Softmasters on 6/1/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Botkit = require('botkit');
var app = express();

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})


//botkit coed

//access_token
//EAAM5n6Dt8fkBAGZC6MuibqfPAdfelmPbAaEVIYW7xRZBIf25ThPNT8nfZBSo8IrdgZBhNv53Mr89NfCx1yACl2pVV0qNiWHciF0ApmauZAp91edaAb1hZAl9hqxZA65CJDSwfwhC568vZCqvqJozLuWoy4ePUeDw3yceZBnBkmZAjCuAZDZD
var controller = Botkit.facebookbot({
    access_token: process.env.access_token,
    verify_token: process.env.verify_token,
})

var bot = controller.spawn({});


controller.setupWebserver(process.env.PORT || 5000, function (err, webserver) {
    controller.createWebhookEndpoints(controller.webserver, bot, function () {
        console.log('This bot is online!!!');
    });
})


controller.on('facebook_optin', function (bot, message) {
    bot.reply(message, 'Hello');
    bot.reply(message, 'Hi, my name is Pepper and I am your Black Jack Dealer.Would you like to play a round?!');
    bot.reply(message, {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: 'Option',
                buttons: [
                    {
                        type: 'postback',
                        title: 'yes',
                        payload: 'yes'
                    },
                    {
                        type: 'postback',
                        title: 'yes',
                        payload: 'yes'
                    }
                ]
            }
        }
    })
})


controller.hears(['play'], 'message_received', function (bot, message) {
    bot.reply(message, 'Hello');
    bot.reply(message, 'Hi, my name is Pepper and I am your Black Jack Dealer.!');
    bot.reply(message, {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: 'Dealer.Would you like to play a round?!',
                buttons: [
                    {
                        type: 'postback',
                        title: 'Yes',
                        payload: 'yes'
                    },
                    {
                        type: 'postback',
                        title: 'No',
                        payload: 'no'
                    }
                ]
            }
        }
    })
})

controller.hears(['show'], 'message_received', function (bot, message) {
    bot.reply(message, 'Hello');
    bot.reply(message, 'Hi, my name is Pepper and I am your Black Jack Dealer.Would you like to play a round?!');
    bot.reply(message, {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [
                    {
                        title: "Classic White T-Shirt",
                        image_url: "http://petersapparel.parseapp.com/img/item100-thumb.png",
                        subtitle: "Soft white cotton t-shirt is back in style",
                        buttons: [
                            {
                                type: "web_url",
                                url: "https://petersapparel.parseapp.com/view_item?item_id=100",
                                title: "View Item"
                            },
                            {
                                type: "web_url",
                                url: "https://petersapparel.parseapp.com/buy_item?item_id=100",
                                title: "Buy Item"
                            },
                            {
                                type: "postback",
                                title: "Bookmark Item",
                                payload: "USER_DEFINED_PAYLOAD_FOR_ITEM100"
                            }
                        ]
                    },
                    {
                        title: "Classic Grey T-Shirt",
                        image_url: "http://petersapparel.parseapp.com/img/item101-thumb.png",
                        subtitle: "Soft gray cotton t-shirt is back in style",
                        buttons: [
                            {
                                type: "web_url",
                                url: "https://petersapparel.parseapp.com/view_item?item_id=101",
                                title: "View Item"
                            },
                            {
                                type: "web_url",
                                url: "https://petersapparel.parseapp.com/buy_item?item_id=101",
                                title: "Buy Item"
                            },
                            {
                                type: "postback",
                                title: "Bookmark Item",
                                payload: "USER_DEFINED_PAYLOAD_FOR_ITEM101"
                            }
                        ]
                    }
                ]
            }
        }
    });
})


controller.hears(['hello', 'hi'], 'message_received', function (bot, message) {
    bot.reply(message, 'Hello');
    bot.startConversation(message, function (err, convo) {
        convo.ask('What is your name?', function (response, convo) {
            convo.say('Ok  ' + response.text + ' Lets get Started!!!');
            convo.next();
        });
    });
})



controller.hears(['bet', '^pattern$'], ['message_received'], function (bot, message) {

    // do something to respond to message

    bot.reply(message, 'your bet recieved!');

});

controller.hears(['cookies'], 'message_received', function (bot, message) {

    bot.startConversation(message, function (err, convo) {
        convo.say('Did someone say cookies!?!!');
        convo.ask('What is your favorite type of cookie?', function (response, convo) {
            convo.say('Golly, I love ' + response.text + ' too!!!');
            convo.next();
        });
    });
})


controller.on('facebook_postback', function (bot, message) {
    switch (message.payload) {
        case 'yes':

            bot.reply(message, "How much do you want to bet")
            break
        case 'no':
            bot.reply(message, "Thank for playing the game with us")
            break
    }
})
