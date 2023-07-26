import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const CreateProduct = () => {
  const toast = useToast()
  const [allCategories, setAllCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });
  // console.log(newProduct)
  const handleImage = (e) => {
    console.log(e.target.files[0]);
     setNewProduct({...newProduct, image: e.target.files[0]})
  };;
  const [response, setResponse] = useState({});
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        await axios
          .get("/api/v1/category/categories")
          .then((response) => {
            // console.log(response.data)
            setAllCategories(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, []);

  // product creation
  const createProduct = async () => {
    try {
      const productData = new FormData()
      productData.append('name', newProduct.name)
      productData.append("category", newProduct.category.toString());
      productData.append("description", newProduct.description);
      productData.append("quantity", newProduct.quantity);
      productData.append("price", newProduct.price);
      productData.append("photo", newProduct.image);

      await axios
        .post("/api/v1/product/create-product", productData)
        .then((response) => {
          setResponse(response.data);
        });
        console.log(response)
        if(response.success){
          toast({title:"Product Created Successfully", status:"success"})
        }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box>
        <Box paddingBottom={"1rem"}>
          <Text fontSize={"1xl"}>View all Products</Text>
          <Link to={"/dashboard/admin/all-products"}>
            <Button>View Products</Button>
          </Link>
        </Box>
        <VStack gap={"0.5rem"} alignItems={"flex-start"}>
          <Select
            onChange={(e) => {
              setNewProduct({ ...newProduct, category: e.target.value });
            }}
          >
            <option disabled selected>
              Select your category
            </option>
            {allCategories.map((category) => {
              return <option value={category._id}>{category.name}</option>;
            })}
          </Select>
          <Input
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value });
            }}
            placeholder="Enter the name of the product"
          />
          <Textarea
            onChange={(e) => {
              setNewProduct({ ...newProduct, description: e.target.value });
            }}
            placeholder="Description of the product"
          />
          <InputGroup>
            <InputLeftAddon children="₹" />
            <Input
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: e.target.value });
              }}
              placeholder="Price of the product"
            />
          </InputGroup>
          <Input
            onChange={(e) => {
              setNewProduct({ ...newProduct, quantity: e.target.value });
            }}
            placeholder="Quantity of the product available"
          />
          <InputGroup>
            <InputLeftAddon children="Upload Photo" />
            <Input
              accept="image/png, image/gif, image/jpeg"
              name="file"
              type="file"
              onChange={(e) => handleImage(e)}
              placeholder="Price of the product"
            />
          </InputGroup>
          <Button onClick={createProduct}>Create</Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default CreateProduct;
