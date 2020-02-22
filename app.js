const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://itsAdityaDatta:Jisvsa%40706@cluster0-pzosv.mongodb.net/postsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
  title: {
    type: String
  },
  matter: {
    type : String
  }
});

const Post = mongoose.model("postCollection",postSchema);

const app = express();

app.use(bodyParser.urlencoded({extended:true})); // bodyParser
app.use(express.static('public')); // express.static
app.set('view engine','ejs'); // ejs

// let port = process.env.PORT;    // Heroku
// if(port == null || port == ""){
//     port = 3000;
// }

let port = 3000;
app.listen(port,function(){
    console.log('Server has started successfully');
});

app.get("/",function(req,res){
    Post.find({}, function(err, posts3){                //posts3 is an array of posts, example : To access title of first post posts3[0].title
        res.render("home", {
          posts2: posts3
          });
     
      });
});

app.get("/about",function(req,res){
    res.render('about',{
        'body': aboutContent,
    });
});

app.get("/compose",function(req,res){
    res.render('compose');
});

app.post("/compose",function(req,res){
    let post = {
        matter : req.body.postMatter,
        title : req.body.postTitle,
    }
    const post2 = new Post({
        title: post.title,
        matter: post.matter
    });

    post2.save(function(err){
        if(err){
            console.log(err);
            window.alert('An error has occured.');
        }
        else{
            res.redirect("/");
        }
    });
});

app.get("/posts/:postID", function(req,res){
    const str1 = (req.params.postID);
    Post.find({}, function(err, posts3){      //posts3 is an array of posts, example : To access title of first post posts3[0].title
        posts3.forEach(function(post){
            const str2 = post._id;
            if(str1 == str2){
                res.render('post',{
                    pageTitle : post.title,
                    title : post.title,
                    body : post.matter
                });
            }
        });
     
    });


});


const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum a. Sed risus pretium quam vulputate dignissim suspendisse in. Tellus orci ac auctor augue mauris augue neque. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Id velit ut tortor pretium. Sed faucibus turpis in eu mi bibendum neque. Vel fringilla est ullamcorper eget nulla facilisi etiam. Accumsan in nisl nisi scelerisque eu ultrices vitae. Arcu vitae elementum curabitur vitae nunc. Ipsum a arcu cursus vitae congue mauris. Mauris in aliquam sem fringilla ut morbi. Eget arcu dictum varius duis at consectetur. Maecenas sed enim ut sem viverra aliquet eget sit amet. Posuere morbi leo urna molestie at. Viverra nibh cras pulvinar mattis. Eget mi proin sed libero. Leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. At elementum eu facilisis sed odio morbi quis commodo. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Massa sed elementum tempus egestas sed sed risus. Tortor posuere ac ut consequat semper viverra. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit euismod in pellentesque massa placerat duis ultricies.Ipsum dolor sit amet consectetur adipiscing. Nec ultrices dui sapien eget mi. Augue interdum velit euismod in. Blandit cursus risus at ultrices mi. Dui id ornare arcu odio ut sem. Habitant morbi tristique senectus et. Convallis posuere morbi leo urna molestie at. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Fermentum et sollicitudin ac orci phasellus. Nisi lacus sed viverra tellus. Hendrerit gravida rutrum quisque non tellus orci ac. Elementum pulvinar etiam non quam lacus.Turpis tincidunt id aliquet risus feugiat. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. Viverra tellus in hac habitasse. Tortor pretium viverra suspendisse potenti. Eu augue ut lectus arcu bibendum. Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. Est ullamcorper eget nulla facilisi etiam. Sit amet tellus cras adipiscing. Sit amet justo donec enim. Amet nulla facilisi morbi tempus iaculis urna id. Diam in arcu cursus euismod. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Felis eget velit aliquet sagittis id consectetur purus ut. Tortor pretium viverra suspendisse potenti nullam. Cras adipiscing enim eu turpis.Leo vel fringilla est ullamcorper eget nulla facilisi. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Pellentesque pulvinar pellentesque habitant morbi. Netus et malesuada fames ac. Quam adipiscing vitae proin sagittis. Nunc sed velit dignissim sodales ut. Lacus vestibulum sed arcu non odio. Rhoncus aenean vel elit scelerisque. Eget dolor morbi non arcu risus. Ultricies mi eget mauris pharetra et ultrices neque ornare. Posuere lorem ipsum dolor sit amet. Tellus mauris a diam maecenas sed enim ut. Elementum pulvinar etiam non quam. Eget mi proin sed libero enim sed. Pellentesque id nibh tortor id aliquet. At erat pellentesque adipiscing commodo elit at imperdiet. Feugiat vivamus at augue eget arcu dictum varius. Nunc lobortis mattis aliquam faucibus purus. Et molestie ac feugiat sed. Magna fermentum iaculis eu non diam phasellus vestibulum. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum a. Sed risus pretium quam vulputate dignissim suspendisse in. Tellus orci ac auctor augue mauris augue neque. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Id velit ut tortor pretium. Sed faucibus turpis in eu mi bibendum neque. Vel fringilla est ullamcorper eget nulla facilisi etiam. Accumsan in nisl nisi scelerisque eu ultrices vitae. Arcu vitae elementum curabitur vitae nunc. Ipsum a arcu cursus vitae congue mauris. Mauris in aliquam sem fringilla ut morbi. Eget arcu dictum varius duis at consectetur. Maecenas sed enim ut sem viverra aliquet eget sit amet. Posuere morbi leo urna molestie at. Viverra nibh cras pulvinar mattis. Eget mi proin sed libero. Leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. At elementum eu facilisis sed odio morbi quis commodo. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Massa sed elementum tempus egestas sed sed risus. Tortor posuere ac ut consequat semper viverra. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit euismod in pellentesque massa placerat duis ultricies.Ipsum dolor sit amet consectetur adipiscing. Nec ultrices dui sapien eget mi. Augue interdum velit euismod in. Blandit cursus risus at ultrices mi. Dui id ornare arcu odio ut sem. Habitant morbi tristique senectus et. Convallis posuere morbi leo urna molestie at. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Fermentum et sollicitudin ac orci phasellus. Nisi lacus sed viverra tellus. Hendrerit gravida rutrum quisque non tellus orci ac. Elementum pulvinar etiam non quam lacus.Turpis tincidunt id aliquet risus feugiat. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. Viverra tellus in hac habitasse. Tortor pretium viverra suspendisse potenti. Eu augue ut lectus arcu bibendum. Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. Est ullamcorper eget nulla facilisi etiam. Sit amet tellus cras adipiscing. Sit amet justo donec enim. Amet nulla facilisi morbi tempus iaculis urna id. Diam in arcu cursus euismod. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Felis eget velit aliquet sagittis id consectetur purus ut. Tortor pretium viverra suspendisse potenti nullam. Cras adipiscing enim eu turpis.Leo vel fringilla est ullamcorper eget nulla facilisi. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Pellentesque pulvinar pellentesque habitant morbi. Netus et malesuada fames ac. Quam adipiscing vitae proin sagittis. Nunc sed velit dignissim sodales ut. Lacus vestibulum sed arcu non odio. Rhoncus aenean vel elit scelerisque. Eget dolor morbi non arcu risus. Ultricies mi eget mauris pharetra et ultrices neque ornare. Posuere lorem ipsum dolor sit amet. Tellus mauris a diam maecenas sed enim ut. Elementum pulvinar etiam non quam. Eget mi proin sed libero enim sed. Pellentesque id nibh tortor id aliquet. At erat pellentesque adipiscing commodo elit at imperdiet. Feugiat vivamus at augue eget arcu dictum varius. Nunc lobortis mattis aliquam faucibus purus. Et molestie ac feugiat sed. Magna fermentum iaculis eu non diam phasellus vestibulum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum a. Sed risus pretium quam vulputate dignissim suspendisse in. Tellus orci ac auctor augue mauris augue neque. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Id velit ut tortor pretium. Sed faucibus turpis in eu mi bibendum neque. Vel fringilla est ullamcorper eget nulla facilisi etiam. Accumsan in nisl nisi scelerisque eu ultrices vitae. Arcu vitae elementum curabitur vitae nunc. Ipsum a arcu cursus vitae congue mauris. Mauris in aliquam sem fringilla ut morbi. Eget arcu dictum varius duis at consectetur. Maecenas sed enim ut sem viverra aliquet eget sit amet. Posuere morbi leo urna molestie at. Viverra nibh cras pulvinar mattis. Eget mi proin sed libero. Leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. At elementum eu facilisis sed odio morbi quis commodo. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Massa sed elementum tempus egestas sed sed risus. Tortor posuere ac ut consequat semper viverra. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit euismod in pellentesque massa placerat duis ultricies.Ipsum dolor sit amet consectetur adipiscing. Nec ultrices dui sapien eget mi. Augue interdum velit euismod in. Blandit cursus risus at ultrices mi. Dui id ornare arcu odio ut sem. Habitant morbi tristique senectus et. Convallis posuere morbi leo urna molestie at. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Fermentum et sollicitudin ac orci phasellus. Nisi lacus sed viverra tellus. Hendrerit gravida rutrum quisque non tellus orci ac. Elementum pulvinar etiam non quam lacus.Turpis tincidunt id aliquet risus feugiat. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. Viverra tellus in hac habitasse. Tortor pretium viverra suspendisse potenti. Eu augue ut lectus arcu bibendum. Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. Est ullamcorper eget nulla facilisi etiam. Sit amet tellus cras adipiscing. Sit amet justo donec enim. Amet nulla facilisi morbi tempus iaculis urna id. Diam in arcu cursus euismod. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Felis eget velit aliquet sagittis id consectetur purus ut. Tortor pretium viverra suspendisse potenti nullam. Cras adipiscing enim eu turpis.Leo vel fringilla est ullamcorper eget nulla facilisi. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Pellentesque pulvinar pellentesque habitant morbi. Netus et malesuada fames ac. Quam adipiscing vitae proin sagittis. Nunc sed velit dignissim sodales ut. Lacus vestibulum sed arcu non odio. Rhoncus aenean vel elit scelerisque. Eget dolor morbi non arcu risus. Ultricies mi eget mauris pharetra et ultrices neque ornare. Posuere lorem ipsum dolor sit amet. Tellus mauris a diam maecenas sed enim ut. Elementum pulvinar etiam non quam. Eget mi proin sed libero enim sed. Pellentesque id nibh tortor id aliquet. At erat pellentesque adipiscing commodo elit at imperdiet. Feugiat vivamus at augue eget arcu dictum varius. Nunc lobortis mattis aliquam faucibus purus. Et molestie ac feugiat sed. Magna fermentum iaculis eu non diam phasellus vestibulum.";