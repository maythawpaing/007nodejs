var express = require('express');
var router = express.Router();
var User = require('../../Model/User');
var bcrypt= require('bcryptjs');
var Post = require('../../Model/Post');
var checkAuth = require('../middleware/check-auth');

router.get('/list',checkAuth,function(req,res){
  Post.find(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal server err",
        error:err
      })
    }else{
      res.status(200).json({
        posts:rtn
      });
    }
  })
})
router.post('/add',checkAuth,function(req,res){
  var post = new Post();
  post.title=req.body.title;
  post.content=req.body.content;
  post.author=req.body.author;
  post.save(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal server err",
        error:err
      })
    }else{
      res.status(201).json({
      message:"Post Added",
      post:rtn
    })
    }
  })
})
router.get('/:id',function(req,res){
  Post.findById(req.params.id,function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal server err",
        error:err
      })
    }else{
      res.status(200).json({
        message:"Post Detail",
        posts:rtn
      });
    }
  })
})
router.patch('/:id',function(req,res){
  var update= {};
  for (var opt of req.body){
    update[opt.proName]=opt.proValue
  }
  Post.findByIdAndUpdate(req.params.id,{$set:update},function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server err",
        error:err
      })
    }else{
      res.status(200).json({
        message:"Post Updated"
      })
    }
  })
})
router.delete('/:id',function(req,res){
  Post.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server err",
        error:err
      })
    }else{
      res.status(200).json({
        message:"Post Deleted"
      })
    }
  })
})


module.exports = router;
