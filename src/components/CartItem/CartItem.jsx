import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Box, Button, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text, useToast} from "@chakra-ui/react";
import {AiFillDelete, AiFillHeart} from 'react-icons/ai'
import {BiArrowToBottom} from 'react-icons/bi'
const CartItem = ({id,qty}) => {
    const toast = useToast()
    const [response, setResponse] = useState({})
    // const[quantity, setQuantity] = useState(1)
    const quantityData=[1,2,3,4,5,6,7,8,9,10]
    useEffect(()=>{
        const getProductDetails = async()=>{
            try{
                const {data} = await axios.get(`/api/v1/product/product-by-id?query=${id}`)
                setResponse(data.data)
            }catch(error){
                console.log(error)
            }
        }
        getProductDetails()
    },[id])
    const removeFromCart =async ()=> {
        try {
            const {data} = await axios({
                method: 'delete',
                url: '/api/v1/cart/delete-item-cart', data: {
                    productId: id
                }
            })
            if (data.success) {
                window.location.reload()
            }
        } catch (error) {
            toast({
                title: `Error Deleting the Item from Cart`,
                description: "Please try again later",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }


    const updateQuantity = async (quantity)=>{
        try{
           const{data} = await axios({
               method:'put',
               url:'/api/v1/cart/update-cart',
               data:{
                   productId:id,
                   quantity:Number(quantity)
               }
           })
            if(data.success){
                window.location.reload()
            }
        }catch (error){
            toast({
                title:`Error Updating the Quantity`,
                description: "Please try again later",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }

  return (
    <Box>
       <HStack justifyContent={['space-between']}>
           <HStack gap={['0rem','1rem']}>
           <Box w={'90px'} h={'120px'} borderRadius={'6px'} border={'0.5px solid #bbb'}>
                <Image w={'full'} h={'full'} objectFit={'contain'} borderRadius={'6px'}   src={`https://apna-dukan-backend.vercel.app/api/v1/product/get-product-photo/${id}`}/>
           </Box>
           <Box display={'flex'} flexDir={'column'} gap={'0.5rem'}>
               <Text fontWeight={'600'}>{response.name}</Text>
               <HStack>
               <Text fontSize={'14px'} fontWeight={'500'}>Rs {response.price}</Text>
                   <Text fontSize={'14px'} fontWeight={'500'}>Qty:- {qty}</Text>
               </HStack>
               <HStack gap={'10px'}>
                   <Button variant={'ghost'} onClick={removeFromCart} fontSize={'12px'} color={'#676C7B'} size={'xl'} _hover={'none'}> <AiFillDelete/>Remove</Button>
                   <Button variant={'ghost'} fontSize={'12px'} color={'#676C7B'} size={'xl'} _hover={'none'}><AiFillHeart/> Add to Wishlist</Button>
               </HStack>
           </Box>
           </HStack>
           <Box>
               <Menu>
                   <MenuButton fontSize={['10px','14px']} w={['90px','120px']}  as={Button} rightIcon={<BiArrowToBottom/>}>
                       Quantity
                   </MenuButton>
                   <MenuList >
                       {
                           quantityData.map((ele)=>{
                               return(
                                   <MenuItem onClick={()=>updateQuantity(ele)} value={ele}>{ele}</MenuItem>
                               )
                           })
                       }
                   </MenuList>
               </Menu>
           </Box>
       </HStack>
    </Box>
  )
}

export default CartItem