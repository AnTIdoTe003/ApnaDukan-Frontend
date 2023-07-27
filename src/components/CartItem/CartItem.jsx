import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CartItem = ({id}) => {
    const [response, setResponse] = useState({})
    useEffect(()=>{
        const getProductDetails = async()=>{
            try{
                const {data} = await axios.get(`/api/v1/product/product-by-id?query=${id}`)
                console.log(data)
                setResponse(data.data)
            }catch(error){
                console.log(error)
            }
        }
        getProductDetails()
    },[id])
    
  return (
    <div>{response.name}</div>
  )
}

export default CartItem