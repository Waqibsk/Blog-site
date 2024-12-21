const {VerifyToken}=require("../services/auth")


function AuthenticationUsingCookie(cookiename) {
  return (req, res, next) => {
    const TokenCookieValue = req.cookies[cookiename];
    if (!TokenCookieValue) {
      return next();
    }
   // console.log("Token Cookie Value:", TokenCookieValue);

    try {

      const userpayload = VerifyToken(TokenCookieValue);
      req.user = userpayload;
     // console.log("Token payload:", userpayload);
    } catch (err) {
      console.log("Error in creating req.user");
    }
    return next();
  };
}
module.exports = {
  AuthenticationUsingCookie,
};
