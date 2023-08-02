import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const updateUser = async ()=>{
        try{
            const{data} = await axios.put('/api/v1/auth/update-user-details', formData)
            if(data.success){
              window.location.reload();
            }
        }catch(error){
          console.log(error)
        }
  }
  return (
    <Box w={"full"}>
      <Container w={"full"} maxW={"1440px"} m={"0 auto"}>
        <Box w={"full"}>
          <FormControl display={"flex"} flexDirection={"column"} gap={"1rem"}>
            <FormLabel>Name</FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              w={"500px"}
              type="text"
              placeholder="Enter your name"
            />
            <FormLabel>Email address</FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              w={"500px"}
              type="email"
              placeholder="Enter your email"
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel>Password</FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              w={"500px"}
              type="password"
              placeholder="Enter your Password"
            />
            <FormHelperText>We'll never share your password.</FormHelperText>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              w={"500px"}
              type="text"
              placeholder="Confirm your Password"
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel>Shipping Address</FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              w={"500px"}
              type="text"
              placeholder="Tell us where to Ship"
            />
            <FormLabel>Phone Number</FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              w={"500px"}
              type="text"
              placeholder="Enter your phone number"
            />
            <Button bg={"#EE1C47"} color={"white"} onClick={updateUser}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
