import {
  Box,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Text,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { AiOutlinePlusSquare } from "react-icons/ai";
import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import CartItem from "../../components/CartItem/CartItem";
import { useCart } from "../../context/cart";
import axios from "axios";
import {v4 as uuidv4} from 'uuid'
function Checkout(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stage, setStage] = useState(0);
  const [auth] = useAuth();
  const [cart] = useCart();
  const toast = useToast();
  const [address, setAddress] = useState("");

  const updateAddress = async () => {
    try {
      const { data } = await axios({
        method: "put",
        url: "/api/v1/auth/update-user-details",
        data: { address },
      });
      if (data.success) {
        window.location.reload()
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong.",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const clearCart = async()=>{
    try {
      const {data} = await axios.put('/api/v1/cart/clear-cart')
      if(data.success){
        window.location.reload()
      }
    }catch (error){
      toast({
        title:"Error Clearing the Clear",
        description:"Please Reload",
        status:"error",
        duration:3000,
        isClosable:true
      })
    }
  }
  const addToOrder = async()=>{
    try{
      const{data:{key}} = await axios.get('/api/v1/orders/get-api-key')
        const {data:{order}} = await axios({
            method:'post',
            url:'/api/v1/orders/create-order-id',
            data:{
                totalPrice: auth.totalPrice,
            }
        })
      const options = {
        key,
        amount: auth.totalPrice,
        currency: "INR",
        name: "ApnaDukan",
        description: "Tutorial of RazorPay",
        image: "https://png.pngtree.com/png-clipart/20190520/original/pngtree-online-payment-icon-designed-creatively-and-simple-for-freshness-for-application-png-image_3754332.jpg",
        order_id: order.id,
        handler: async function (response) {
          const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userId:auth.user._id,
            orderId:order.id,
            shippingAddress:auth.user.address,
            products:cart,
            totalPrice:auth. totalPrice,
          };

          const result = await axios.post(
              'http://localhost:4000/api/v1/orders/payment-verification',
              data,
          );
          clearCart();
        },
        prefill: {
          name: "ApnaDukan Private Ltd.",
          email: "apnadukan@apnadukan.com",
          contact: "9999999999"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#121212"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open()
    }catch(error){
        toast({
            title: "Something Went Wrong.",
            description: "Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
    }
  }



  return (
    <Box w={"full"}>
      <Container w={"full"} maxW={"1440px"} margin={"0 auto"}>
        <Box w={"full"} display={"flex"} justifyContent={"center"} gap={"3rem"}>
          <Box w={"65%"}>
            <Accordion defaultIndex={[0,1]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "#EE1C47", color: "white" }}
                    borderRadius={"6px"}
                  >
                    <HStack flex={"1"}>
                      <Text>Login</Text>
                      <TiTick color={"green"} fontSize={"20px"} />
                    </HStack>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <HStack>
                    <Text fontWeight={"600"}>{auth.user.name}</Text>
                    <Text>+91 {auth.user.phone}</Text>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "#EE1C47", color: "white" }}
                    borderRadius={"6px"}
                  >
                    <Box flex="1" textAlign="left">
                      Address
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Box>
                      <Text fontWeight={"500"}>
                        {auth.user.name} {auth.user.address}{" "}
                      </Text>
                    </Box>

                    <Box>
                      <Button
                        onClick={onOpen}
                        bg={"#EE1C47"}
                        color={"white"}
                        _hover={"none"}
                      >
                        {" "}
                        <span>
                          <AiOutlinePlusSquare />
                        </span>{" "}
                        {"  "} Edit
                      </Button>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Change Address</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Input
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder={auth.user.address}
                            />
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              bg="#EE1C47"
                              color={"white"}
                              mr={3}
                              _hover={"none"}
                              onClick={updateAddress}
                            >
                              Confirm
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Box>
                  </Box>
                  <Box>
                    <Button onClick={()=>setStage(2)}>Deliver Here</Button>
                  </Box>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem isDisabled={stage !==2 && true}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "#EE1C47", color: "white" }}
                    borderRadius={"6px"}
                  >
                    <Box flex="1" textAlign="left">
                      Order Confirmation
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}  >
                  {
                    cart.length!==0?<>
                      <Box
                          display={"flex"}
                          p={"10px"}
                          flexDirection={"column"}
                          alignItems={"left"}
                          gap={"2rem"}
                          w={"100%"}
                          bg={"rgba(185,187,196,0.42)"}
                          borderRadius={"6px"}
                      >
                        <Box w={"full"}>
                          {cart.map((ele) => {
                            return (
                                <Box>
                                  <CartItem qty={ele.quantity} id={ele.productId} />
                                </Box>
                            );
                          })}
                        </Box>
                        <Box>
                          <Button onClick={addToOrder}>Confirm Order</Button>
                        </Box>
                      </Box>
                    </>:<Box display={'flex'} justifyContent={'center'}>
                      <Text fontWeight={'600'}>Please Add Items to Cart</Text>
                    </Box>
                  }

                </AccordionPanel>
              </AccordionItem>
              {
                cart.length!==0&&
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                          _expanded={{ bg: "#EE1C47", color: "white" }}
                          borderRadius={"6px"}
                      >
                        <HStack flex={"1"}>
                          <Text>Payment</Text>
                          <TiTick color={"green"} fontSize={"20px"} />
                        </HStack>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>

                      <Button>Pay Now</Button>
                    </AccordionPanel>
                  </AccordionItem>
              }

            </Accordion>
          </Box>

          {/* order summary */}
          <Box
            w={"35%"}
            bg={"rgba(185,187,196,0.42)"}
            borderRadius={"6px"}
            display={"flex"}
            p={"10px"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"1.5rem"}
            height={"220px"}
          >
            <Box>
              <Text fontSize={"2xl"} fontWeight={"600"} pb={"20px"}>
                Order Summary
              </Text>
            </Box>
            <Box w={"full"}>
              <VStack w={"full"} borderBottom={"1px dashed #bbb"}>
                <HStack justifyContent={"space-between"} w={"full"}>
                  <Text fontWeight={"600"} fontSize={"14px"}>
                    Total Price:-
                  </Text>
                  <Text fontWeight={"600"} fontSize={"14px"}>
                    Rs {auth.totalPrice}
                  </Text>
                </HStack>
                <HStack justifyContent={"space-between"} w={"full"}>
                  <Text fontWeight={"600"} fontSize={"14px"}>
                    Delivery Fee
                  </Text>
                  <Text
                    fontWeight={"600"}
                    fontSize={"14px"}
                    as={"del"}
                    color={"red"}
                  >
                    Rs 99
                  </Text>
                </HStack>
                <Text
                  fontWeight={"600"}
                  fontSize={"14px"}
                  w={"full"}
                  textAlign={"right"}
                  color={"green"}
                >
                  Free
                </Text>
              </VStack>
              <HStack py={"10px"} justifyContent={"space-between"} w={"full"}>
                <Text fontWeight={"600"} fontSize={"14px"}>
                  Total Payable <span>(including GST)</span>
                </Text>
                <Text fontWeight={"600"} fontSize={"14px"}>
                  Rs {auth.totalPrice}
                </Text>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Checkout;
