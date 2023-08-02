import { Box, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductById = ({id}) => {
    const [response, setResponse] = useState({})
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
    
  return (
   <Box>
    <Box>
        <Text fontWeight={'500'}>{response.name}</Text>
        <Text fontWeight={'500'}>Rs {response.price}</Text>
    </Box>
   </Box>
  )
}

export default ProductById