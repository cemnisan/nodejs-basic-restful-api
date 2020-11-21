const express = require('express');
const router = express.Router();
const MovieSchema = require('../Model/Movie');

router.post('/',(req, res) => {
  const Movie = new MovieSchema(req.body);
  const promise = Movie.save();

  promise.then((data)=>{
    res.json(data)
    
  }).catch((err)=>{
    res.json(err)
  })
})

router.get('/',(req, res) => {
  const promise = MovieSchema.find({ })

  promise.then((data) =>{
    res.json(data)
  }).catch((err) =>{
    res.json(err)
  })

});

router.get('/:movie_id',(req, res) => {
  const promise = MovieSchema.findById(req.params.movie_id);

  promise.then((data) =>{
    res.json(data)
  }).catch((err) =>{
    res.json(err)
  })

})

router.get('/top10',(req, res) => {
  const promise = MovieSchema.find({ }).sort({
    imdb: 1
  }).limit(10)

  promise.then((data) =>{
    res.json(data)

  }).catch((err) =>{
    res.json(err)

  });
});

router.delete('/:movie_id',(req, res) => {
  const promise = MovieSchema.findByIdAndDelete(req.params.movie_id)

  promise.then((movie)=> {
    if(!movie)
      res.json({message:'The movie was not found.',code:403})
    res.json({message:"The movie was successfully deleted.",code:1})

  }).catch((err) =>{
    res.json(err)

  });
});

router.put('/:movie_id',(req, res) => {
  const promise = MovieSchema.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new: true
      }
  );

  promise.then((movie)=>{
    if(!movie)
      res.json({message:"The movie was not found",code:404})
    res.json(movie)

  }).catch((err) =>{
    res.json(err)
  })

});

module.exports = router;
