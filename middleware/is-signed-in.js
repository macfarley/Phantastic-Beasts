// middleware/is-signed-in.js

const isSignedIn = (req, res, next) => {
    if (req.session.user){
        return next();}
    //otherwise redirect
    res.redirect('/auth/sign-in');
  };
  
module.exports = isSignedIn;
  