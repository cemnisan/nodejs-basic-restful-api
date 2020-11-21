const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const DirectorMovie = require('../Model/Director');

router.post('/',(req, res) => {
    const Director = new DirectorMovie(req.body);
    const promise = Director.save();

    promise.then((data) =>{
        res.json(data)

    }).catch((err) =>{
        res.json(err)
    })
});

router.get('/',(req, res) => {
    const promise = DirectorMovie.aggregate([
        {
            $lookup:{
                from:'movies',
                foreignField:'director_id',
                localField:'_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies'
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    lastName:'$lastName',
                    yearOfBirth:'$yearOfBirth',
                    biography:'$biography',

                },
                movies:{
                    $push:'$movies',

                }
            }
        },

        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                lastName:'$_id.lastName',
                yearOfBirth: '$_id.yearOfBirth',
                biography: '$_id.biography',
                movies:'$movies'
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data)

    }).catch((err)=>{
        res.json(err)
    });
});

router.get('/:name',(req, res) => {
    const promise = DirectorMovie.aggregate([
        {
            $match:{
                name:req.params.name
            }
        },
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as:'movies'
            }
        },

        {
            $unwind:{
                path:'$movies'
            }
        },

        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    lastName:'$lastName',
                    birthOfYear:'$birthOfYear',
                    biography:'$biography',

                },
                movies:{
                    $push: '$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                lastName:'$_id.lastName',
                birthOfYear: '$_id.birthOfYear',
                biography: '$_id.biography',
                movies:'$movies'
            }
        }
    ])
    promise.then((data)=>{
        if(!data)
            res.json({message:'The director name was not found.',code:403})
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
});


module.exports = router;