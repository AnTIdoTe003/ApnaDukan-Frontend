import { Box, Fade, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchProducts = ({searchData}) => {
    console.log(searchData)
  return (
   searchData &&<Box bg={'white'}  borderRadius={'10px'} boxShadow={' 0 3px 10px rgb(0 0 0 / 0.2)'} w={'100%'} height={'auto'} position={'absolute'} top={'50px'} p={'10px'}>
   <Box>
       {
        searchData.map((item)=>{
            return(
                <Link target='_blank' to={`/product/${item.slug}`}>
                <HStack borderBottom={'0.5px dashed #bbb'} key={item._id} justifyContent={'space-between'}>
                    <Image w={'50px'} height={'50px'} src={`https://apna-dukan-backend.vercel.app/api/v1/product/get-product-photo/${item._id}`}/>
                    <Text fontWeight={'600'}>{item.name}</Text>
                </HStack>
                </Link>
            )
        })
       }
   </Box>
</Box>
  )
}

export default SearchProducts