import { Box, Button, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
const ProductById = ({id}) => {
    const [response, setResponse] = useState({})
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchProductDetails = async()=>{
            try{
                const {data} = await axios.get(`/api/v1/product/product-by-id?query=${id}`)
                setResponse(data.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchProductDetails()
        
    },[])
    const reOrder = ()=>{
            navigate(`/product/${response.slug}`)
    }
  return (
   <Box>
    <Box>
        <Text fontWeight={'500'}>{response.name}</Text>
        <Text fontWeight={'500'}>Rs {response.price}</Text>
        <Button onClick={reOrder}>Re-Order</Button>
    </Box>
   </Box>
  )
}

export default ProductById