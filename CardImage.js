/**
 * Created by Softmasters on 6/7/2016.
 */

var cards = require('node-of-cards');
var _ = require('lodash');


class CardImage {
    constructor(rank) {
        this.rank = rank;

    }

    toString() {
        return "return card";
    }

    image() {
        cards.draw(function (err, data) {
            // play around with data

            console.log(data);
        });
    }


}

module.exports = CardImage;