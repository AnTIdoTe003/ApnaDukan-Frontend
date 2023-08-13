import React from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import AsyncSpinner from "../../../components/Spinner/Spinner";
const HomeProductCard = ({
  id,
  name,
  image,
  quantity,
  price,
  description,
  slug,
}) => {
  const toast = useToast()
  const addToWishlist = async()=>{
    try{
      const {data} = await axios.post('/api/v1/wishlist/add-to-wishlist', {
        productId:id
      })
      if(data.success) {
        window.location.reload()
      }
    }catch(error){
      toast({
        title:"Error adding wishlist",
        description:"Please try again later",
        status:"error",
        duration:3000,
        isClosable:true
      })
    }
  }
  return (
    <Link href={`/product/${slug}`}>
      <Box
        position={"relative"}
        bg={"#F7FAFC"}
        border={"0.5px solid #bbb"}
        borderRadius={"6px"}
        p={"1rem"}
        w={["180px","300px"]}
        h={"auto"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"left"}
          gap={"0.75rem"}
          w={"full"}
          h={"full"}
          flexWrap={'wrap'}
        >
          {
            (!image)? <AsyncSpinner/>: <Image height={"150px"} src={image} objectFit={"contain"} mixBlendMode={'multiply'} />
          }
          <HStack pt={"1rem"} justifyContent={"space-between"}>
            <Text fontWeight={"700"}>{name}</Text>
            <Text fontWeight={"700"}>₹ {price}</Text>
          </HStack>
          <Text>{description.substring(0, 20)}...</Text>
          <Text>{quantity} left </Text>
          <HStack>
            <Button
              onClick={addToWishlist}
              position={"absolute"}
              top={"0"}
              right={["-12px","0"]}
              variant={"ghost"}
              color={"#EE1C47"}
            >
              <AiOutlineHeart size={"20px"} />
            </Button>
          </HStack>
        </Box>
      </Box>
    </Link>
  );
};

export default HomeProductCard;
