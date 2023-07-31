import React from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
const HomeProductCard = ({
  name,
  image,
  quantity,
  price,
  description,
  slug,
}) => {
  return (
    <Link href={`/product/${slug}`}>
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
          gap={"0.75rem"}
          w={"full"}
          h={"full"}
        >
          <Image height={"150px"} src={image} objectFit={"contain"} mixBlendMode={'multiply'} />
          <HStack pt={"1rem"} justifyContent={"space-between"}>
            <Text fontWeight={"700"}>{name}</Text>
            <Text fontWeight={"700"}>₹ {price}</Text>
          </HStack>
          <Text>{description.substring(0, 20)}...</Text>
          <Text>{quantity} left </Text>
          <HStack>
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
    </Link>
  );
};

export default HomeProductCard;
