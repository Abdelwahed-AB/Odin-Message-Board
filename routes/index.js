var express = require('express');
var router = express.Router();

const {body, validationResult} = require("express-validator");

Number.prototype.padLeft = function(base,chr){
  var  len = (String(base || 10).length - String(this).length)+1;
  return len > 0? new Array(len).join(chr || '0')+this : this;
}
let formatDate = (d)=>{
  return [(d.getMonth()+1).padLeft(), d.getDate().padLeft(), d.getFullYear()].join('/') +' ' +
   [d.getHours().padLeft(), d.getMinutes().padLeft()].join(':');
}

const messages = [
  {
    title: "Hello!",
    text: "Hi there!",
    user: "Amando",
    date: formatDate(new Date())
  },
  {
    title: "World!",
    text: "Hello World!",
    user: "Charles",
    date: formatDate(new Date()),
  }
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    messages: messages,
  });
});

router.get('/new', (req, res, next)=>{
  res.render("message_form");
});

router.post('/new', [ 
  body("title").isLength({min:1}).withMessage("Message must have a title."),
  body("message").isLength({min:1}).withMessage("You must write a message."),
  body("user").isLength({min:1}).withMessage("Username not specified."),
  (req, res, next)=>{
    let errors = validationResult(req);

    if(!errors.isEmpty()){
      res.render("message_form", { 
        errors:errors.array(),
        title: req.body.title,
        message: req.body.message,
        user: req.body.user,
       });
      return;
    }

    let msg = {
      title: req.body.title,
      text: req.body.message,
      user: req.body.user,
      date: formatDate(new Date()),
    };

    messages.push(msg);
    res.redirect("/");
  }

]);
module.exports = router;
