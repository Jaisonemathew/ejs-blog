const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to our tech blog! We are excited to have you here and to share our love of technology with you. On our blog, you'll find a wide variety of content that covers the latest tech news, product reviews, helpful tutorials, and much more. Our team of writers and contributors are passionate about staying up-to-date on the latest tech trends and sharing their knowledge with our readers. Whether you're a tech expert or just looking to learn more about the industry, we have something for everyone. Thank you for choosing to join us on this journey of discovery and learning. We hope that you find our content informative, useful, and enjoyable. Thank you for reading, and we look forward to sharing our love of technology with you!";
const aboutContent = "Welcome to our tech blog! We are a team of technology enthusiasts and experts who are passionate about sharing the latest tech news, product reviews, and helpful tutorials with our readers. Our goal is to provide our readers with accurate and up-to-date information on the ever-evolving world of technology, and to help them make informed decisions when it comes to their tech purchases and usage. We have a diverse team of writers and contributors, each with their own areas of expertise and unique perspectives. Together, we strive to bring a well-rounded and comprehensive approach to our coverage of the tech industry. Thank you for choosing to join us on this journey of discovery and learning. We hope that you find our content informative, useful, and enjoyable. Thank you for reading, and we look forward to sharing our love of technology with you!";
const contactContent = "Thank you for reaching out to us! We value your feedback, comments, and suggestions, and we are always looking for ways to improve and provide the best possible experience for our readers. If you have any questions, comments, or ideas that you would like to share with us, please don't hesitate to get in touch. You can reach us by email at sorrythisisgeneratedby@chatgpt.com or by filling out the contact form on our website. We will do our best to get back to you as soon as possible, but please note that it may take some time for us to respond due to the volume of messages that we receive. Thank you again for your interest in our tech blog. We look forward to hearing from you!";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/posts/:postname', (req, res) => {

  var postname = _.lowerCase([string = req.params.postname]);

  posts.forEach(function (post) {
    var ptitle = _.lowerCase([string = post.title]);
    if (postname == ptitle) {
      res.render('post', {
        posttitle: post.title,
        postbody: post.body
      });
      res.redirect("/posts");
    }
  });
});


app.post('/compose', function (req, res) {
  const post = {
    title: req.body.posttitle,
    body: req.body.postbody
  }
  posts.push(post);
  res.redirect("/");
});

app.get('/', function (req, res) {
  res.render('home', {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

app.get('/about', function (req, res) {
  res.render('about', {
    aboutContent: aboutContent
  });
});

app.get('/contact', function (req, res) {
  res.render('contact', {
    contactContent: contactContent
  });
});

app.get('/compose', function (req, res) {
  res.render('compose');
});

app.listen(process.env.port);



