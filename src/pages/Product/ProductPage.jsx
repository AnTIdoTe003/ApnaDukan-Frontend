import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../../store/slices/CartSlice";

const ProductPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [response, setResponse] = useState({});
  const [category, setCategory] = useState({});
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
  console.log(response);
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
              onClick={() =>
                dispatch(
                  addItemToCart({
                    id: response._id,
                    quantity: 1,
                    name: response.name,
                    price: response.price,
                  })
                )
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
