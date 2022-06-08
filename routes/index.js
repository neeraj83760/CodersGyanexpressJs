const router = require('express').Router();
const apiKeyMiddleware = require('../routes/middlewares/apiKey')


// To apply middleware in all the routes (we need router level middleware)mentioned in this 
// file u just need to 
// write just single line of code

//router.use(apiKeyMiddleware); // after writing this line of code u can remove the router from
// middleware as an argument from 4 router function mentioned below 



router.get('/', (req, res)=>{
     
        res.render('index',{
      
          title: 'My Home Page'
        });
      })


router.get('/about', (req, res)=>{
  
        res.render('about',{
    
          title: 'About Page'
        });
    })

router.get('/download', (req, res)=>{
  
        res.download(path.resolve(__dirname)+ '/about.html');
      })    

// router.get('/api/products', apiKeyMiddleware, (req, res)=>{

// // also you can pass multiple middlewares in the single router in an array like, [apiKeymiddleware, apiKeyMiddleware......]  
// //router.get('/api/products', (req, res)=>{


//     // for Api we send the data in json format so we use json method
//     // kisi be route ke upar middleware ko use karna hai to get method me as a 
//     // second paramter de sakte ho ... aur wo humein import bhi karna hoga
    
//     // we also called it route based middleware 
  
//         res.json([

//             {
//                 id:'123',
//                 name:'chrome'
//             },
            
//             {
//                 id:'124',
//                 name:'Firefox'
//             },

//         ])

//       })          


module.exports = router; 