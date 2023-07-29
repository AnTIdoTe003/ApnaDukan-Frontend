import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./auth";

const CartContext = createContext()

const CartProvider = ({children})=>{
    const [cart, setCart] = useState([])
    const[auth] = useAuth()
    useEffect(()=>{
        const getCart = async()=>{
            try{
                const {data} = await axios.get('/api/v1/auth/get-user-details')
                setCart(data.data.cart)
            }catch(error){
                console.log(error)
            }
        }
        getCart()
    },[auth.token])
    return(
        <CartContext.Provider value={[cart, setCart]} >
            {children}
        </CartContext.Provider>
    )
}

const useCart = ()=> useContext(CartContext)

export {useCart,CartProvider}

