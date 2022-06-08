
// React component name is always start with capital letter 
// Browser don't understand JSX so we first need to change it into simple Javascript
// by using transpiler called Babel which is can use using CDN link and add it into the scripts
// file 
const App =() =>{
    // setProducts prodcuts ko update karne ke liye also begning me empty array hi hoga 
    // products ki default value begnning me empty array hi hogi below line ke code me 
    const [products, setProducts]= React.useState([]);

// form object will pass the value in input type form.name and form.price 
    const [form, setForm] = React.useState({

        name:'',
        price:''
    }); 

    // Dusra hook humein chahiye wo hai useEffect... kyon? because jaise hi humara
    // component load ho jata hai humein request karni hoti hai humare server pe data lene
    // ke liye ...... Ye hook leta hai ek function 

    React.useEffect(()=>{
       
        fetchProducts()

    },[]) // second paramter is hook ka hota hai dependency array ..koi bhi state change
    // hota hai to Ye function rerun hota hai 
    // But Agar aap empty array pass karte ho to jab humara component mount ho jata hai tab
    // useEffect ka function ek hi baar run hota hai()
    
    function fetchProducts(){
       // Below one is the Ajax call 
        fetch('/api/products')
        .then((res)=> res.json())
        .then(data =>{

            // console.log(data);
            setProducts(data);  
        }); 
    }

    function handleSubmit(e){
        // we need to firt stop the form from submitting 
      e.preventDefault();

      if(!form.name || !form.price){

        return; 
      }

      fetch('/api/products', {

        method:'POST',
        headers:{
            'content-Type': 'application/json' 
        },
        body: JSON.stringify(form) // passing form object which having data in javscript format so we need to change it to string object
      }).then(res => res.json())
      .then(data =>{
       // niche wali line ko comment karke naya line code islye likha taaki hum to product
       // form se data submit kar rahe hai wo post to ho hi saath me jo data item add kiya hai
       // wo display bhi ho same product webpage pe
       // console.log(data)// is point pe aake humien data milta hai itne baar data format change karke
       fetchProducts();
       // Empty kardo name and price inputbox ko after adding the item in the list showing in the product Page 
       setForm({name:'', price:''}); 
      
      })
    }

    function updateForm(event, field){
      if(field==='name' ){
      setForm({
          ...form,
          name:event.target.value
      })
    }else if(field==='price'){
        setForm({
            ...form,
            price:event.target.value
        }) 

    }

    }

    const deleteProduct = (productId) => {

     fetch(`/api/products/${productId}`,{

      method:'DELETE'

     }).then((res)=> res.json())
       .then((data)=>{
       fetchProducts();
       console.log(data)
       }); 

    }

//     return <h1>Hello from React</h1>
       return(
           <>
        <div className="card">
        <div className="card-header">
         Add a product
        </div>
        <div className="card-body"> 

       <form onClick={handleSubmit}>
            <input type="text" value={form.name} onChange={()=> updateForm(event,'name')} placeholder="Product Name..." className="form-control mt-3"/>
            <input type="text" value={form.price} onChange={()=> updateForm(event,'price')} placeholder="Product Price..." className="form-control mt-3"/>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
       </form>     
      </div>
      </div>


     {/* // In JSX we write ClassName instead of just class because class is a reserve keyword
     // Yahan se humein ajax call karna hai server pe aur wahan se data lena hai or products
     // ki list dikhani hai ... use liye humien yahan pe local state create karna hoga
     // react hooks ka use karke */}
     
     
       <ul className="list-group mt-4">
           {
             products.map((product)=>{
                  return(

                    // Applying properties in the parent list tag to keep the delte Icons in
                    // the left side of the ,dflex means display flex
                    
                    // after this we need to make a form ..jisse hum humare express serverpe
                    // POST request kar pqyenge .....
                 <li key={product.id} className="list-group-item d-flex justify-content-between
                 align-item-center">
                 <div>
                 <strong>{product.name}: </strong>
                 ${product.price}
                 </div>
                 {/* Adding onclick event becoz  we want to delete the item from the product form , but the button is in the loop */}
                 <button className="btn" onClick ={()=> deleteProduct(product.id)}  >
                   {/*we need to change the class to ClassName because it's JSX  */}
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                 className="bi bi-trash" viewBox="0 0 16 16">
                 <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 
                 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 
                 0V6z"/>
                 <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 
                 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 
                 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.
                 882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>

                 </button>

                 </li>
                  )

             })
           } 
           
       {/* <li className="list-group-item">And a fifth one</li> */}
       </ul>
       </>) 

}


ReactDOM.render(<App />, document.getElementById('app')); 