'use strict';

var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');


// Routing
var router = express.Router();
router.get('/', search);
router.get('/count', count);
router.get('/:id', getByID);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/:id/riders', addRider);

var TripSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    date: String,
    time: String,
    riders: [String],
    center: {
        latitude: String,
        longitude: String
    },
    zoom: Number,
    markers: [{
        label: String,
        location: {
            latitude: Number,
            longitude: Number
        }
    }]
});

var Trip = mongoose.model('Trips', TripSchema);


module.exports = router;


function handleError(res, err) {
    return res.send(500, err);
}

////////////

function prepareSearch(searchText) {
    var searchReq;

    if (searchText && searchText.length > 0) {
        var regexp = new RegExp(searchText, 'i');

        searchReq = {
            '$or': [
                { 'title': regexp },
                { 'description': regexp }
            ]
        };
    } else {
        searchReq = {};
    }

    return searchReq;;
}

function search(req, res) {
    var searchText = req.query.search;
    var page = req.query.page;
    var number = req.query.number;

    var searchReq = prepareSearch(searchText);

    Trip.find(searchReq).limit(number).skip((page-1) * number).exec(function (err, trips) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, trips);
    });
};

function count(req, res) {
    var searchText = req.query.search;

    var searchReq = prepareSearch(searchText);
    
    Trip.count(searchReq, function (err, count) {
        if (err) {
            return handleError(res, err);
        }

        return res.send(200, count + "");
    });
}

function getByID(req, res) {
    var _id = req.params.id;

    Trip.findById(_id, function(err, trip) {
        if (err) {
            return handleError(res, err);
        }
        if (!trip) {
            return res.send(404);
        }

        return res.json(200, trip);
    });
    
};

function create(req, res) {
    var newTrip = req.body;

    Trip.create(newTrip, function(err, trip) {
        if (err) {
            return handleError(res, err);
        }  

        return res.json(201, trip);
    });
};


function update(req, res) {
    var _id = req.params.id;

    if (req.body._id) {
        delete req.body._id;
    }

    Trip.findById(_id, function (err, trip) {
        if (err) {
            return handleError(res, err);
        }
        if (!trip) {
            return res.send(404);
        }

        var updated = _.merge(trip, req.body);

        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(200, updated);
        })
    });
}

function remove(req, res) {
    Trip.findById(req.params.id, function (err, trip) {
        if (err) {
            return handleError(res, err);
        }
        if (!trip) {
            return res.send(404);
        }

        trip.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }

            return res.send(204);
        });
    });
}

function addRider(req, res) {
    var _id = req.params.id;

    var newRider = req.body.rider;

    Trip.findById(_id, function(err, trip) {
        if (err) {
            return handleError(res, err);
        }
        if (!trip) {
            return res.send(404);
        }

        if (_.contains(trip.riders, newRider)) {
            return res.send(204);
        }

        trip.riders.push(newRider);

        trip.save(function(err) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(201, trip);
        });
    });
};
