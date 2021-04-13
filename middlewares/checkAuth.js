const jwt = require('jsonwebtoken');
const jwtSecretKey = "jwtPrivatekey"

function checkAuth(req, res, next){
     try {
		const authHeader = req.header('authorization');
		const token = authHeader && authHeader.split(' ')[1];
          if (!token) {
               res.status(401).send('Access denied, No token provided.')
               return
          }
		jwt.verify(token, jwtSecretKey, (error, user) => {
               if (error) {
                    return res.status(401).send('Authentication failed.')
               } else {
                    req.authUser = user;
			     next();
               }
		});
	} catch (error) {
		res.status(500).send('Internal server error.');
	}
}
module.exports = checkAuth;