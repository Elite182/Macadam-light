'use strict';

var express = require('express');


// Routing
var router = express.Router();
router.get('/', search);
router.post('/', create);
router.delete('/:id', destroy);


// Init model
var trips = [{
    "_id": 0,
    "url": "http://tympanus.net/Development/CreativeGooeyEffects/index.html",
    "title": "Gooey Effects on Chat App - Very nice !",
    "description": "A demo chat app with Gooey effect",
    "tags": ["chat", "demo", "mobile"]
}];
var nextId = trips.length;

module.exports = router;


////////////


// Get list of articles
function search(req, res) {
    var searchText = req.query.search;

    var filtered;
    if (searchText && searchText.length > 0) {
        var regexp = new RegExp(searchText, 'i');

        filtered = [];
        for (var i = 0; i < trips.length; ++i) {
            var trip = trips[i];
            var tripToString = JSON.stringify(trip);

            if (tripToString.match(regexp)) {
                filtered.push(trip);
            }
        }
    } else {
        filtered = trips;
    }

    return res.json(200, filtered);
};


// Creates a new article in the DB.
function create(req, res) {
    var newtrip = req.body;

    newtrip._id = nextId;
    ++nextId;

    trips.push(newtrip);

    return res.json(201, newatrip);
};


// Deletes a article from the DB.
function destroy(req, res) {
    var _id = parseInt(req.params.id);

    for (var i = 0; i < trips.length; ++i) {
        var trip = trips[i];

        if (_id === trip._id) {
            trips.splice(i, 1);

            return res.send(204);
        }
    }

    return res.send(404);
};
