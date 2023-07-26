import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useAuth } from "../../context/auth";
const ProductCard = ({ name, image, quantity, price, description }) => {
  const [auth] = useAuth();
  return (
    <Box
      position={"relative"}
      bg={"#F7FAFC"}
      border={"0.5px solid #bbb"}
      borderRadius={"6px"}
      p={"1rem"}
      w={"300px"}
      h={"auto"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"left"}
        gap={'0.75rem'}
        w={"full"}
        h={"full"}
      >
        <Image height={"150px"} src={image} objectFit={"contain"} />
        <HStack pt={"1rem"} justifyContent={'space-between'}>
          <Text fontWeight={'700'} >{name}</Text>
          <Text  fontWeight={'700'}>₹ {price}</Text>
        </HStack>
        <Text>{description.substring(0,30)}</Text>
        <Text>{quantity} left </Text>
        <HStack>
          <Button
            _hover={{ bg: "gray.500", color: " white" }}
            bg={"#EE1C47"}
            w={"120px"}
            h={"30px"}
            borderRadius={"10px"}
            fontSize={"12px"}
            color={"white"}
          >
            Edit
          </Button>
          <Button
            position={"absolute"}
            top={"0"}
            right={"0"}
            variant={"ghost"}
            color={"#EE1C47"}
          >
            <AiOutlineHeart size={"20px"} />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
