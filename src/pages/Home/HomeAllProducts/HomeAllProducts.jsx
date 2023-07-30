import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container} from "@chakra-ui/react";
import HomeProductCard from "../HomeProductCard/HomeProductCard";
const HomeAllProducts = ({ filterData }) => {
  const [response, setResponse] = useState([]);
  const fetchAllProducts = async () => {
    try {
      await axios
        .get("/api/v1/product/get-all-products")
        .then((res) => setResponse(res.data.allProducts));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      await axios
        .post("/api/v1/product/filter-products", filterData)
        .then((res) => setResponse(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (filterData.price.length > 0 || filterData.category.length > 0) {
      fetchFilteredProducts();
    } else {
      fetchAllProducts();
    }
  }, [filterData.price, filterData.category]);
  return (
    <Box w={"100%"}>
      <Container maxW={"1440px"} w={"full"}>
        <Box display={"flex"} flexDirection={"column"} gap={"1rem"} py={"1rem"}>
          <Box display={"flex"} flexDirection={"column"} gap={"1rem"}></Box>
          <Box w={"full"} display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
            {response.map((ele) => {
              return (
                <HomeProductCard
                  key={ele._id}
                  id={ele._id}
                  name={ele.name}
                  slug ={ele.slug}
                  quantity={ele.quantity}
                  price={ele.price}
                  description={ele.description}
                  image={`http://localhost:4000/api/v1/product/get-product-photo/${ele._id}`}
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeAllProducts;
