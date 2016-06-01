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
});

//controller.setupWebserver(webserverPort, function (pError, app) {
//    controller.createWebhookEndpoints(app);
//    console.log('This bot is online!!!');
//});


controller.on('facebook_option', function (bot, message) {
    bot.reply(message, 'Hi, my name is Pepper and I am your Black Jack Dealer.Would you like to play a round?!');
});


controller.hears(['hello', 'hi'], 'message_received', function (bot, message) {
    bot.reply(message, 'Hello');
    bot.reply(message, ' my name is Pepper and I am your Black Jack Dealer.Would you like to play a round?!');
    bot.reply(message, {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: 'which do you prefer',
                buttons: [
                    {
                        type: 'postback',
                        title: 'Cats',
                        payload: 'shoe_cat'
                    },
                    {
                        type: 'postback',
                        title: 'Dogs',
                        payload: 'show_dog'
                    }
                ]
            }
        }
    })
});


controller.hears(['cookies'], 'message_received', function (bot, message) {

    bot.startConversation(message, function (err, convo) {
        convo.say('Did someone say cookies!?!!');
        convo.ask('What is your favorite type of cookie?', function (response, convo) {
            convo.say('Golly, I love ' + response.text + ' too!!!');
            convo.next();
        });
    });
});


controller.on('facebook_postback', function (bot, message) {
    switch (message.payload) {
        case 'show_cat':
            bot.reply(message, {
                attachment: {
                    type: 'template',
                    payload: {
                        type: 'image',
                        payload: {
                            url: 'http://gph.is/1P7et4J'
                        }
                    }
                }
            })
            break
        case 'show_dog':
            bot.reply(message, {
                    attachment: {
                        payload: {

                            type: 'image',
                            payload: {
                                url: 'http://gph.is/1g2NU59'
                            }
                        }
                    }
                }
            )
            break
    }
});
