import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useAuth} from "../../context/auth";
import {
  Box, Container, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Text, Button,
} from "@chakra-ui/react";
import {AiFillEyeInvisible} from 'react-icons/ai'
import greentick from '../../assets/greentick.gif'
import {retry} from "@reduxjs/toolkit/query";
const Orders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [auth]= useAuth()
  const[orders, setOrders]= useState([])
  const [orderData, setOrderData] = useState()
  useEffect(() => {
    const fetchUserOrders=async ()=>{
      try {
        const {data} = await  axios.get(`/api/v1/orders/get-all-orders?userId=${auth.user._id}`)
        setOrders(data.userOrder)
   }catch (error){
        console.log(error)
      }
    }
    fetchUserOrders()
  }, []);
  console.log(orderData)
  return (
    <Box w={'full'}>
      <Container w={'full'} maxW={'1440px'} margin={'0 auto'}>
        <Box w={'full'}>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>OrderId</Th>
                  <Th>Transaction Id</Th>
                  <Th>Payment Status</Th>
                  <Th>Order Date</Th>
                  <Th>Preview</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  orders.map((ele)=>{
                    return(
                        <Tr key={ele._id}>
                          <Td>{ele.orderId}</Td>
                          <Td>{ele.razorpayPaymentId}</Td>
                          <Td>{ele.isPaid?<Image w={'30px'} src={greentick}/>:"Not Paid"}</Td>
                          <Td>{Date(ele.createdAt)}</Td>
                          <Td onClick={onOpen}><AiFillEyeInvisible/></Td>
                        </Tr>
                    )
                  })
                }
                <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  )
}

export default Orders