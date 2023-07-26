import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import "../../styles/home.scss";
import home_headphone from "../../assets/home_headphone.png";
import HomeAllProducts from "./HomeAllProducts/HomeAllProducts";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { priceFilter } from "../../constants/priceFilter";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [filterData, setFilterData] = useState({
    category: [],
    price: "",
  });
  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      setCategories(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const getFilteredData = async()=>{

  }
  
  const [auth] = useAuth();
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilterData((prevFilterData) => ({
        ...prevFilterData,
        category: [...prevFilterData.category, value],
      }));
    } else {
      setFilterData((prevFilterData) => ({
        ...prevFilterData,
        category: prevFilterData.category.filter((item) => item !== value),
      }));
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <main>
      <div className="home-wrapper">
        <div className="home-container">
          <div className="home-content">
            <div className="home-texts">
              <h2>Grab upto 50% off On Selected Headphone</h2>
              <button>Buy Now</button>
            </div>
            <div className="home-img">
              <img src={home_headphone} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="product-page-wrapper">
        <div className="product-page-container">
          <div className="product-page-content">
            <div className="product-page-heading">
              <h1>Here are the latest products for you!!</h1>
            </div>
            <div className="product-page-data">
              <div className="product-page-data-left">
                <Box>
                  <Text fontWeight={"600"}>Filter By Price</Text>
                  <RadioGroup>
                    <Stack
                      direction="column"
                      onChange={(e) => {
                        setFilterData({
                          ...filterData,
                          price: e.target.value.split(","),
                        });
                      }}
                    >
                      {priceFilter.map((ele) => {
                        return (
                          <Radio key={ele.id} value={ele.value.toString()}>
                            {ele.name}
                          </Radio>
                        );
                      })}
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box>
                  <Text fontWeight={"500"}>Filter by Category</Text>
                  <CheckboxGroup>
                    <Stack direction="column">
                      {categories.map((ele) => {
                        return (
                          <Checkbox
                            key={ele.id}
                            value={ele._id}
                            onChange={handleCheckboxChange}
                            checked={filterData.category.includes(ele._id)}
                          >
                            {ele.name}
                          </Checkbox>
                        );
                      })}
                    </Stack>
                  </CheckboxGroup>
                </Box>

                <Button
                  variant={"ghost"}
                  onClick={() => window.location.reload()}
                >
                  Clear All Filters
                </Button>
              </div>
              <div className="product page-data-right">
                <HomeAllProducts filterData={filterData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
