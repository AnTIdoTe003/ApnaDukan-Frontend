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
        <Box w={"full"} display={"flex"} flexDirection={"column"} gap={["1rem","5rem"]}>
          <Box  display={"flex"} flexDirection={["column", "row"]} justifyContent={'center'} alignItems={"center"} gap={["1rem","5rem"]} >
            <Box  w={["300px","700px"]} h={'500px'} border={"1px dashed #bbb"} borderRadius={"10px"}>
              <Image
                w={["300px","700px"]}
                height={"500px"}
                objectFit={"contain"}
                mixBlendMode={"multiply"}
                src={`https://apna-dukan-backend.vercel.app/api/v1/product/get-product-photo/${response._id}`}
              />
            </Box>
            <Box w={'100%'}  display={"flex"} flexDirection={"column"} gap={"1rem"}  >
              <Text fontSize={["36px","72px"]} fontWeight={"700"}>
                {response.name}
              </Text>
              <Text w={['100%','500px']} fontWeight={"500"}>{response.description}</Text>
              <Text fontWeight={"500"}>Rs {response.price}</Text>
              <Text fontWeight={"400"}>Category :- {category.name}</Text>
              <HStack position={["fixed", "static"]} bottom={["0"]} right={'0'} w={'100%'} zIndex={'100'}>
                <Button w={['100%', '150px']} borderBottomLeftRadius={["none","6px"]} borderBottomRightRadius={["none","6px"]} height={'60px'} alignSelf={'center'}  _hover={'none'} bg={"#EE1C47"} color={"white"} onClick={addToCart}>
                  <MdShoppingCart /> Add to Cart
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
              flexWrap={'wrap'}
            >
              <Box pb={"2rem"}>
                <Text fontSize={"2xl"} fontWeight={"600"}>
                  Similar Products
                </Text>
              </Box>
              <Box display={"flex"} flexWrap={'wrap'} gap={'1rem'} >
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
                      image={`https://apna-dukan-backend.vercel.app/api/v1/product/get-product-photo/${ele._id}`}
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
