
const express = require('express')
const app = express()
const port = 3000
const getData = require("./functions/getData");



app.use(express.json({limit:'50mb'}))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))



app.get('/', async(req, res) => {
  const dataUser = JSON.parse(await getData());
  res.render('pages/index', {dataUser});
});

app.get('/novel', (req, res) => {
  res.render('pages/novel');
});
app.get('/CatchVirus', (req, res) => {
  res.render('pages/CatchVirus');
});
app.get('/faq', (req, res) => {
  res.render('pages/faq');
});
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

