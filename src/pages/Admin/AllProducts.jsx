import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { Box, Container,Select, Text } from "@chakra-ui/react";
const AllProducts = () => {
  const [response, setResponse] = useState([]);
  const[searchData, setSearchData] = useState('All')
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() =>{
    const fetchAllCategories = async()=>{
      try{
       await  axios.get('/api/v1/category/categories').then(res => setAllCategories(res.data))
       }catch(error){
        console.log(error)
      }
    }
    fetchAllCategories()
  },[])
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        await axios
          .get("/api/v1/product/get-all-products")
          .then((res) => setResponse(res.data.allProducts));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();
  }, []);
  return (
    <Box w={"100%"}>
      <Container maxW={"1440px"} w={"full"}>
        <Box display={"flex"} flexDirection={"column"} gap={'1rem'} py={'1rem'}>
          <Box display={"flex"} flexDirection={"column"} gap={'1rem'}>
            <Text textDecoration={'underline'} textAlign={'center'} fontSize={'2xl'}>All Products</Text>
            <Select onChange={(e)=>setSearchData(e.target.value)}>
              <option value={'All'} selected>All</option>
          {
            allCategories.map((ele)=>{
              return(
                <option key={ele._id} value={ele.name}>{ele.name}</option>
              )
            })
          }
            </Select>
          </Box>
          <Box w={"full"} display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
            {response.filter((ele)=>{
              return (searchData!== 'All') ?ele.category?.name===searchData: ele;
            }).map((ele) => {
              return (
                <ProductCard
                  key={ele._id}
                  id={ele._id}
                  name={ele.name}
                  quantity={ele.quantity}
                  price={ele.price}
                  description={ele.description}
                  image={`https://apna-dukan-backend.vercel.app/api/v1/product/get-product-photo/${ele._id}`}
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default AllProducts;
