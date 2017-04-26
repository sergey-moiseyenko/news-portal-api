const express = require('express');
let router = express.Router();
//let passport = require('../config/passport/passport-basic');
let passport = require('../config/passport/passport-digest');

//local auth
/*router.post('/user', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});


router.delete('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

*/

//basic auth
/*router.get('/user',
  passport.authenticate('basic', {session: false}),
  (req, res) => {
    res.send(req.user);
  });
*/

//digest auth
router.get('/user',
  passport.authenticate('digest', { session: false }),
  (req, res) => {
    res.send(req.user);
  });


module.exports = router;
