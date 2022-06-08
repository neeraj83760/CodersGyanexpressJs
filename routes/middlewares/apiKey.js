const ErrorHandler = require('../../Errors/ErrorHandler');

function apiKey(req, res, next){

 const api_key = '1234567';
  // request ke andar jo bhi data hum send karte hain wo humein request.body ke through 
  // milta hai ..jum bhi hum post request karte hain 
 // but to request a query string which is : "?api_key=1234567" in the URL so to get this kind
 // of srting we need req.query

//  console.log(req.query);

console.log(req.query.api_key);
//  next(); 

 // req and res ke beech me bahut se middleware hote hain ek ke baad ek ...to har ek middleware
 // se humein next call karna hota hai iska matlab ek middleware ka kaam ho gya to chalo
 // next middleware pe abhi 

 const userApiKey = req.query.api_key;

 if(userApiKey && userApiKey === api_key){

   next();// this is the way we process the request 
 }else
 
 {
      
  next(ErrorHandler.serverError());

    // res.json({message : 'Not allowed!'})

 }

}


module.exports = apiKey; 