import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdShoppingCartCheckout, MdShoppingCart } from "react-icons/md";
import HomeProductCard from "../Home/HomeProductCard/HomeProductCard";
const ProductPage = () => {
  const { slug } = useParams();
  const [response, setResponse] = useState({});
  const [category, setCategory] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  const toast = useToast();
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
  useEffect(() => {
    const fetchSimilarProduct = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `/api/v1/product/product-by-category?query=${response._id}`,
        });
        if (data.success) {
          setSimilarProduct(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSimilarProduct();
  }, [response]);
  console.log(similarProduct);
  const addToCart = async () => {
    try {
      const { data } = await axios({
        method: "put",
        url: "/api/v1/cart/add-to-cart",
        data: {
          productId: response._id,
          price: response.price,
          quantity: 1,
        },
      });
      if (data.success) {
        toast({
          title: "Added to Cart",
          description: "Please Go to the Cart Page",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Error Adding to Cart",
        description: "Please try again after some time",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w={"full"} mt={'1rem'}>
      <Container w={"full"} maxW={"1440px"} margin={"0 auto"}>
        <Box w={"full"} display={"flex"} flexDirection={"column"} gap={"5rem"}>
          <Box display={"flex"} alignItems={"center"} gap={"5rem"}>
            <Box w={'700px'} h={'500px'} border={"1px dashed #bbb"} borderRadius={"10px"}>
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
              <Text w={'500px'} fontWeight={"500"}>{response.description}</Text>
              <Text fontWeight={"500"}>Rs {response.price}</Text>
              <Text fontWeight={"400"}>Category :- {category.name}</Text>
              <HStack>
                <Button _hover={'none'} bg={"#EE1C47"} color={"white"} onClick={addToCart}>
                  <MdShoppingCart /> Add to Cart
                </Button>
                <Button bg={"#676c7b2b"} color={"#EE1C47"}>
                  <MdShoppingCartCheckout /> Place Order
                </Button>
              </HStack>
            </Box>
          </Box>
          {/* Similar Products */}
          {similarProduct.length!==0 && (
            <Box
              borderTop={"1px solid black"}
              py={"1rem"}
              w={"100%"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box pb={"2rem"}>
                <Text fontSize={"2xl"} fontWeight={"600"}>
                  Similar Products
                </Text>
              </Box>
              <Box display={"flex"} flexWrap={"wrap"} gap={"2rem"}>
                {similarProduct.map((ele) => {
                  return (
                    <HomeProductCard
                      key={ele._id}
                      id={ele._id}
                      name={ele.name}
                      slug={ele.slug}
                      quantity={ele.quantity}
                      price={ele.price}
                      description={ele.description}
                      image={`http://localhost:4000/api/v1/product/get-product-photo/${ele._id}`}
                    />
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPage;
