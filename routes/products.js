const router = require('express').Router();
const ErrorHandler = require('../Errors/ErrorHandler');
let products = require('./ProductData');
const apiKeyMiddleware = require('../routes/middlewares/apiKey')


router.get('/products', (req, res)=>{
  
    res.render('products',{

      title: 'My Products Page'
    });
});

// lets create an API route 

router.get('/api/products', (req, res)=>{

   res.json(products);
})
// Next humein route ke andar hi nahi middleware ke andar bhi mil jaata hai 
router.post('/api/products', apiKeyMiddleware, (req, res, next)=>{
  const {name, price} = req.body;
  // hum apne cleint se json data bhejte hai and express by default JSON data receive nahi
  // karti hai .....use humein batana hota hai proactively ....by applying middleware(json middleware) ..otherwsie
  // below line of code terminal main undefined dikhayega
  // console.log(req.body); 

  // try{console.log(city)}catch(err){next(ErrorHandler.serverError(err.message));


  if(!name || !price){

   next(ErrorHandler.validationError());

    // throw new Error('All fields are required!');  
    // validation error code ..422 matlab unprocessable entity 
    // return res.status(422).json({error:'All Fields are required'});
  }

  const product = {
    name,
    price,
    id: new Date().getTime().toString()
    }
  
  products.push(product);

  res.json(product);
});

// Now we need to create a route to avoid "Cannot DELETE /api/products/1650276831502" error in review section in
// chrome dev tools 

router.delete('/api/products/:productId',(req, res)=>{

  products = products.filter((product)=> req.params.productId !== product.id)

  res.json({status: 'OK'});
})


module.exports = router; 