import {Box, Button, Container, Image, Text, useToast} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../../store/slices/CartSlice";

const ProductPage = () => {
  const { slug } = useParams();
  const [response, setResponse] = useState({});
  const [category, setCategory] = useState({});
  const toast = useToast()
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/get-single-product/${slug}`
        );
        setResponse(data.product);
        setCategory(data.product.category);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleProduct();
  }, [slug]);

  const addToCart = async()=>{
    try{
      const {data} = await axios({
        method:'put',
        url:'/api/v1/cart/add-to-cart', data:{
          productId: response._id,
          price:response.price,
          quantity:1
        }
      })
      console.log(data)
      if(data.success){
        toast({
          title: 'Added to Cart',
          description: "Please Go to the Cart Page",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    }catch (error){
      toast({
        title: 'Error Adding to Cart',
        description: "Please try again after some time",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box w={"full"}>
      <Container w={"full"} maxW={"1440px"} margin={"0 auto"}>
        <Box display={"flex"} alignItems={"center"} gap={"5rem"}>
          <Box border={"1px dashed #bbb"} borderRadius={"10px"}>
            <Image
              w={"700px"}
              height={"500px"}
              objectFit={"contain"}
              mixBlendMode={"multiply"}
              src={`http://localhost:4000/api/v1/product/get-product-photo/${response._id}`}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
            <Text fontSize={"72px"} fontWeight={"700"}>
              {response.name}
            </Text>
            <Text fontWeight={"500"}>{response.description}</Text>
            <Text fontWeight={"500"}>Rs {response.price}</Text>
            <Text fontWeight={"400"}>Category :- {category.name}</Text>
            <Button
              onClick={
              addToCart
              }
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPage;
