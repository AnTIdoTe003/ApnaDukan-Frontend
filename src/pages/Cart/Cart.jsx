import React from "react";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import axios from "axios";
import CartItem from "../../components/CartItem/CartItem";

const Cart = () => {
  const [cart] = useCart();
  const [auth] = useAuth();
  return auth.token ? (
    <Box w={"full"}>
      <Container w={"full"} maxWidth={"1440px"} margin={"0 auto"}>
        <Box w={"full"} display={"flex"}>
          {/* Cart Items */}
          <Box>
            <Box>
              <Text>Your Cart Items are</Text>
            </Box>
            <Box>
              {cart.map((ele) => {
                return(
                  <Box>
                    <CartItem id={ele.productId}/>
                    </Box>
                )
              })}
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
