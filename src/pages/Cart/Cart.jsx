import React from "react";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../../store/slices/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    return state.cart.items;
  });

  console.log(cartItems);
  const [auth] = useAuth();
  return auth.token ? (
    <Box w={"full"}>
      <Container w={"full"} maxW={"1440px"} margin={"0 auto"}>
        <Box w={"full"} display={"flex"} gap={"1rem"}>
          <Box
            w={"70%"}
            bgColor={"gray.200"}
            boxShadow={"0 3px 10px rgb(0 0 0 / 0.2)"}
            borderRadius={"6px"}
          >
            <Box>
              <Text textAlign={"center"} fontWeight={"600"}>
                Your Cart Items
              </Text>
            </Box>
            <Box>
              {cartItems.map((ele) => {
                return (
                  <Box>
                    <Text>{ele.productId}</Text>
                    <Text>{ele.price}</Text>
                    <Box>
                      <Button
                        onClick={() =>
                          dispatch(removeItemFromCart(ele.productId))
                        }
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box
            w={"30%"}
            bgColor={"gray.200"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            boxShadow={"0 3px 10px rgb(0 0 0 / 0.2)"}
            borderRadius={"6px"}
          >
            <Box>
              <Text textAlign={"center"} fontWeight={"600"}>
                Your order value
              </Text>
            </Box>
            <Box>
              {cartItems.map((ele) => {
                return (
                  <Box>
                    <Text>{(ele.price += ele.price)}</Text>
                  </Box>
                );
              })}
            </Box>
            <Box>
              <Button alignSelf={"center"}>Go To Checkout</Button>
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
