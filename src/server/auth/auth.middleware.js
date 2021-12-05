module.exports = function(req, res, next) {
  const username = req.session.username;
  const userId = req.session.userId;
  if (!username) {
    res.status(401).send('Unauthorized: No session available');
  } else {
    req.username = username;
    req.userId = userId;
    next();
  }
}
