var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const session = require('express-session');
const http = require('http');
const mongoose = require('mongoose')
const schools = require('./views/js/school')
const saturday = require('./views/js/saturday')
const attendance = require('./views/js/attendance')
const users = require('./views/js/user')
const feedback = require('./views/js/feedback')

//CONNECT TO DB
mongoose.connect("mongodb+srv://XXXXX:XXXX@tsec-nie5s.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("connected to db");
})

// Create instance of express app
var app = express()

// We want to serve js and html in ejs
// ejs stands for embedded javascript
app.set('view engine', 'ejs')

// We also want to send css, images, and other static files
app.use(express.static('views'))
app.set('views', __dirname + '/views')

// Give the server access to the user input
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'))

app.get('/',async (req, res) => {
  let user;
  user = await users.find().select("name verticals gender");
  console.log(user)
  res.render("home.ejs",{data:user});        
})

app.post('/', async (req,res) => {
  // var college = "fr.crce"
  var college = "Thadomal College"
  console.log(req.body.date)
  data = await saturday.findOne({ college: college, date: req.body.date});
  d = (data.coding_mem.concat(data.dance_mem)).concat(data.drama_mem)
  console.log(d)
  res.render("attendance.ejs",{data : d, date : req.body.date});
})

app.post('/attendance', (req,res) => {
     const attend = new attendance({
      date : req.body.date,
      coding : req.body.coding,
      dance : req.body.dance,
      drama : req.body.drama,
      users : [req.body.mem1,req.body.mem2,req.body.mem3,req.body.mem4,req.body.mem5,req.body.mem6]
    });
    try{
        attend.save()
        console.log('attendance sucessfully registered!!');
    } catch (err) {
        console.log('Failed!! Please fill all the details in the form');
    }
  res.render("home.ejs");
})

app.get('/feedback', (req,res) => {
  res.render('feedback.ejs')
})

app.post('/feedback', (req,res) => {
  const feed = new feedback({
    coding : sum_code,
    dance : sum_dance,
    drama : sum_drama,
    speaking : sum_publicS,
    music : sum_music,
    elex : sum_elec,
    arts : sum_visualA,
    frisbee : sum_frisbee,
    manager : sum_schoolM,
    college : "fr.crce"
 });
 try{
     feed.save()
     console.log('feedback sucessfully registered!!');
 } catch (err) {
     console.log('Failed!! Please fill all the details in the form');
 }
res.render("feedback.ejs",{data : feed});
})

app.use(session({secret: 'anything-you-want-but-keep-secret'}));

var port = process.env.PORT || 8000

app.listen(port, function(){
    console.log('App running on port ' + port)
})


