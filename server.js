const express = require('express');

const path = require('path');
const ErrorHandler = require('./Errors/ErrorHandler');
// const { title } = require('process');

const app = express();

const mainRouter= require('./routes/index')

const productRouter = require('./routes/products')


// const apiKeyMiddleware = require('./routes/middlewares/apiKey')

// app.listen(3000);

// if we don't know wether the specific port will be avaiable or not then 
// we write a diffrent line of code 

// below line of code tells u how to check the available port in the env variable

const Port = process.env.Port || 3000;


// EJS is one of the template engine , we first need to tell the expressjs that we have
// the EJS template engine (also called view Engine) which we want to use it.. and we also tell the expjs that
// where are all the files 

// set method ko aap jo bhi key or value doge wo humare App ke upar.. or object ke
// container ke andar store kar deti hai aur jab bhi humenin usse fir se dekhna hai to 
// usko hum get kar sakte hai 
app.set('view engine', 'ejs' );

// console.log(app.get('view engine'));

// by default we called our HTML files 'views'
// ye HTMl files ko codersgyanecpress folder ke andar ek aur views folder ke andar doondhega
console.log(app.get('views'));

// Static is a middleware 
// The below one is the global middleware . it will apply on all the routes 
app.use(express.static('public'));

app.use(express.json()); 


// app.use(apiKeyMiddleware)

// Harcode the port number is not good because u don't wether the respective port will be
// free or not 

// we can also set to port in terminal by writing PORT=5000 node server.js 

// app.listen(3000, ()=>{

//     console.log('Listening on Port 3000')
// });

// app.listen(Port, ()=>{console.log(`Listening on port ${Port}`)});

// TO create a route we need to write the below mentioned code, other wise in the browser
// window we will only see :  Cannot /GET , something like that 

// If we keep on writing the routes like the way we wrote in the below mentioned code
// and if we have multiple pages in our website that the code here become messy and
// it will be difficult to manage ........here comes the Express router comes to rescue !!

// app.get('/', (req, res)=>{
  
//   // res.send('Hello from express JS Javascript'); 

//   // res.send('<h1>Hello from express JS Javascript</h1>'); 

//   // In node we have a path module which we use to generate the path of a directory or file 

//   // res.sendFile(path.resolve(__dirname)+ '/index.html');

//   // res.render('index'); 

//   res.render('index',{

//     title: 'My Home Page'
//   });
// })

app.use(mainRouter); // this single line of code help to make server.js page clean 

// app.get('/about', (req, res)=>{
  
//     // res.sendFile(path.resolve(__dirname)+ '/about.html');

//     // res.render('about')

//     res.render('about',{

//       title: 'About Page'
//     });
// })
app.use(productRouter); 

// To receive the JSON data from the cleint side in the post request we need to include it in our server file
// app.use(express.json()); 

// app.get('/download', (req, res)=>{
  
//   res.download(path.resolve(__dirname)+ '/about.html');
// })

// Another concept in Express JS is : static middleware

// If u are getting localhost:3000/about.html ... .html extension in the URL that's is 
// also not correct ,,,, there are ways to pull out the extension from the URL 

//below one is a global middleware which we use for Error Handling ... middleware takes
//three parameters, req,res,next
app.use((req,res,next)=>{

  return res.json({message: 'Page Not Found!'});
})

// Below one is Error handling middlware, diffrence btween normal middlware and error handling
// middleware is, first argument Error handling middleware takes is err,req,res,next 4 arguments
// in total but normal takes just  aruguments 

// Error object ke upar property hoti hai message 
app.use((err,req,res,next)=>{

    if(err instanceof ErrorHandler){
    
        res.status(err.status).json({
            
            error:{
            message: err.message,
            status: err.status
            }
        });


    } else{
       
        res.status(500).json({
            
            error:{
            message: err.message,
            status: err.status
            }
        });

    }

//  console.log('Error:', err.message);
//  res.json({message: err.message});
//  next(); 
})

app.listen(Port, ()=>{console.log(`Listening on port ${Port}`)});
