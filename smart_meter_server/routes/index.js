var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api', function (req, res, next) {
  let bodyRequest = req.body;
  console.log(req.body);
  res.send(JSON.stringify(bodyRequest));

})

module.exports = router;
