'use strict';

var express = require('express');


// Routing
var router = express.Router();
router.get('/', search);
router.get('/:id', getByID);
router.post('/', create);
router.delete('/:id', destroy);


// Init model
var trips = [{
    _id: 0,
    title: "JCC",
    description: "A JCC production !",
    location: "Ile-de-France",
    date: "2015-03-20",
    time: "15:00",
    participants: [ "julien", "clément F", "cédric", "clément N" ],
    center: { latitude: 48.7707452, longitude: 2.0803735 },
    zoom: 10,
    markers: [
        { label: "guyancourt", location: { latitude: 48.7707452, longitude: 2.0803735 } }
    ]
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

    console.log("GET /trips " + filtered.length + " results")
    return res.json(200, filtered);
};

function getByID(req, res) {
    var _id = parseInt(req.params.id);

    if (_id < 0 || _id >= trips.length) {
        console.log("GET /trips/:id id=" + _id + " -> 404");
        return res.send(404);
    }

    var trip = trips[_id];

    console.log("GET /trips/:id id=" + _id + " -> 200");
    return res.json(200, trip);
};


// Creates a new article in the DB.
function create(req, res) {
    var newtrip = req.body;

    newtrip._id = nextId;
    ++nextId;

    trips.push(newtrip);

    console.log("POST /trips -> 201 " + newtrip);
    return res.json(201, newtrip);
};


// Deletes a article from the DB.
function destroy(req, res) {
    var _id = parseInt(req.params.id);

    for (var i = 0; i < trips.length; ++i) {
        var trip = trips[i];

        if (_id === trip._id) {
            trips.splice(i, 1);

            console.log("DELETE /trips/:id id=" + _id + " -> 204");
            return res.send(204);
        }
    }

    console.log("DELETE /trips/:id id=" + _id + " -> 404");
    return res.send(404);
};
