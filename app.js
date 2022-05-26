const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");

const app = express();
mongoose.connect("mongodb://localhost:27017/wikiDB");



const articleSchema = new mongoose.Schema({title:String,content:String});
const Article = new mongoose.model('Article',articleSchema);

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

////////////////// Target_All Articles//////////////////

app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,docs){
    if(err){
      res.send(err);
    }else{
      res.send(docs);
    }
  });
})
.post(function(req,res){
  const newArticle = new Article({title:req.body.title,content:req.body.content});
  newArticle.save(function(err){
    if(err){
      res.send(err);
    }else{
      res.sent("successfully added new articles!")
    }
  });
})
.delete(function(req,res){
  Article.deleteMany({},function(err){
    if(err){
      res.send(err);
    }else{
      res.send("successfully deleted all the articles!");
    }
  });
});
////////////////// Target_All Articles//////////////////
////////////////// Target_Individual Articles//////////////////
app.route("/articles/:article")
.get(function(req,res){
  Article.findOne({title:req.params.article},function(err,docs){
    if(!err){
      res.send(docs);
    }else{
      res.send(err);
    }
  });
})
.post(function(req,res){})
.put(function(req,res){
  Article.updateOne({title:req.params.article},{title:req.body.title,content:req.body.content},function(err){
    if(err){
      res.send(err);
    }else{
      res.send("successfully updated article.");
    }
  });
})
.patch(function(req,res){
  Article.updateOne({title:req.params.article},{$set:req.body},function(err){
    if(err){
    res.send(err);
  }else{
    res.send("successfully updated article.");
  }
});
})
.delete(function(req,res){
  Article.deleteOne({title:req.params.article},function(err){
    if(err){
      res.send(err);
    }else{
      res.send("successfully deleted an article.");
    }
  });
});

////////////////// Target_Individual Articles//////////////////

app.listen(3000,function(){
  console.log("successfully started on port 3000");
});
