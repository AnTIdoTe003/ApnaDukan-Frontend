import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductById from './ProductById'
import { HStack, Image, VStack } from '@chakra-ui/react'
const Demo = ({id, openModal, closeModal}) => {
  const[response, setResponse]= useState([])
  useEffect(()=>{
    const fetchOrderData= async()=>{
      try{
        const{data}= await axios.get(`api/v1/orders/order-by-id?orderid=${id}`);
        setResponse(data.data.products)
      }catch(error){
        console.log(error)
      }
    }
    fetchOrderData()
  },[])
  return (
  
        <VStack gap={'1rem'} alignItems={'flex-start'}>
          {
            response.map((ele)=>{

              return(
                <HStack>
                  <Image w={'100px'} h={'100px'} src={`http://localhost:4000/api/v1/product/get-product-photo/${ele.productId}`}/>
                  <VStack/>
                  <ProductById id={ele.productId}/>
                </HStack>
              )
            })
          }
        </VStack>

  )
}

export default Demo