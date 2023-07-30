import React from "react";
import {Box, Button, Container, HStack,  Text, VStack} from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import CartItem from "../../components/CartItem/CartItem";
import {Link} from 'react-router-dom'
const Cart = () => {
  const [cart] = useCart();
  const [auth] = useAuth();
  return auth.token ? (
    <Box w={"full"}>
      <Container w={"full"} maxWidth={"1440px"} margin={"0 auto"}>
        <Box w={"full"} display={"flex"} gap={'2rem'}>
          {/* Cart Items */}
          <Box display={'flex'} p={'10px'} flexDirection={'column'} alignItems={'center'} w={'70%'} bg={'rgba(185,187,196,0.42)'} borderRadius={'6px'}>
            <Box>
              <Text fontSize={'2xl'} fontWeight={'600'} >Your Cart Items are</Text>
            </Box>
            <Box w={'full'}>
              {cart.map((ele) => {
                return(
                  <Box>
                    <CartItem qty={ele.quantity} id={ele.productId}/>
                    </Box>
                )
              })}
            </Box>
          </Box>
        {/*  Subtotal Price*/}
          <Box w={'30%'} bg={'rgba(185,187,196,0.42)'} borderRadius={'6px'} display={'flex'} p={'10px'} flexDirection={'column'} alignItems={'center'} gap={'2rem'}>
            <Box>
              <Text fontSize={'2xl'} fontWeight={'600'}  pb={'20px'}>Your Total Price is</Text>
            </Box>
            <Box w={'full'}>
              <VStack w={'full'} borderBottom={'1px dashed #bbb'}>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Text fontWeight={'600'} fontSize={'14px'}>Total Price:-</Text>
                  <Text fontWeight={'600'} fontSize={'14px'}>Rs {auth.totalPrice}</Text>
                </HStack>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Text fontWeight={'600'} fontSize={'14px'}>Delivery Fee</Text>
                  <Text fontWeight={'600'} fontSize={'14px'} as={'del'} color={'red'}>Rs 99</Text>
                </HStack>
                <Text fontWeight={'600'} fontSize={'14px'} w={'full'} textAlign={'right'} color={'green'}>Free</Text>
              </VStack>
              <HStack py={'10px'} justifyContent={'space-between'} w={'full'}>
                <Text fontWeight={'600'} fontSize={'14px'}>Total Amount <span>(including GST)</span></Text>
                <Text fontWeight={'600'} fontSize={'14px'}>Rs {auth.totalPrice}</Text>
              </HStack>
            </Box>
            <Box>
              <Link to={'/dashboard/checkout'}>
              <Button bg={'#EE1C47'} w={'300px'} h={'50px'} color={'white'} _hover={'none'}>Go to Checkout</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  ) : (
    <Box w={"full"} h={"70vh"}>
      <Container w={"full"} maxW={"1440px"} margin={"0 auto"} h={"full"}>
        <Box
          w={"full"}
          h={"full"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text>Please login to continue</Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;
