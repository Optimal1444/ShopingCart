import { useEffect, useRef, useState } from "react"
import { GetSingleProduct } from "./Services"
import '../output.css'
import { useDispatch } from "react-redux"
import { setItems } from "./Redux/LoginSlice"
import NavBar from "./NavBar"
function ShowCart()
{
    const qtyRef=useRef([])
    const priceRef=useRef([])
    const [products,setProducts]=useState([])
    const dispatch=useDispatch()
    const remove=(pid)=>
    {
        let cart=localStorage.getItem('cart').split(',')
        cart.splice(pid,1)
        localStorage.setItem('cart',cart)
        updateCart()
    }
    const updateCart=()=>{
        const cart=localStorage.getItem('cart').split(',')
        const details=[]
        setProducts([])
        for(let i=0; i<cart.length;i++){
            let productObject={}
            if(cart[i])
                GetSingleProduct(i).then(res=>{productObject=res.data;productObject.qty=cart[i];details.push(productObject);})
           
        }
        setTimeout(() => {
            setProducts(details)
        }, 50);
        
        let total=0
            for(let i=0; i<cart.length;i++){
                if(cart[i]){
                    total+=parseInt(cart[i])
                }
            }
            localStorage.setItem('items',total)
            dispatch(setItems(total))
       
    }
    const increaseQty=(pid,price)=>
    {
        let cart=localStorage.getItem('cart').split(',')
        cart[pid]++
        localStorage.setItem('cart',cart)
        qtyRef.current[pid].innerText=cart[pid]
        const total=parseInt(localStorage.getItem('items'))+1
        localStorage.setItem('items',total)
        dispatch(setItems(total))
        priceRef.current[pid].innerText=price*cart[pid]
    }
    const decreaseQty=(pid,price)=>
    {
        let cart=localStorage.getItem('cart').split(',')
        cart[pid]--
            
        if(cart[pid]>=0){
        localStorage.setItem('cart',cart)
        qtyRef.current[pid].innerText=cart[pid]
        }
        const total=parseInt(localStorage.getItem('items'))-1
        localStorage.setItem('items',total)
        dispatch(setItems(total))
        priceRef.current[pid].innerText=price*cart[pid]
    }
    useEffect(()=>{
        updateCart()
    },[])
    return(
        <>
        <NavBar />
        {        console.log(products)
        }
        {sessionStorage.getItem('user')&&products.map((product,index)=>
        <div key={index} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-auto my-20">
        <img className="object-cover w-100 rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={product.image} alt="" />
        <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
        <div className="flex gap-2">
        <button className=" items-center text-center rounded-md bg-pink-50 px-2 py-3 text-lg font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 h-12 w-10" onClick={()=>{decreaseQty(product.id,product.price)}}>-</button>
        <span className=" items-center text-center rounded-md bg-pink-50 px-2 py-3 text-lg font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 h-12 w-10" ref={(el)=>{qtyRef.current[product.id]=el}}>{product.qty}</span>
        <button className=" items-center text-center rounded-md bg-pink-50 px-2 py-3 text-lg font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 h-12 w-10" onClick={()=>{increaseQty(product.id,product.price)}}>+</button>

        </div>
        
        <div className="flex    items-center justify-center  gap-4">
            <span className="text-xl font-bold text-gray-900 dark:text-white" ref={(el)=>{priceRef.current[product.id]=el}}>${product.price*(parseInt(localStorage.getItem('cart').split(',')[product.id]))}</span>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{remove(product.id)}}>Remove</button>
        </div>
        </div>
    </div>
    )}
        </>
    )
}
export default ShowCart