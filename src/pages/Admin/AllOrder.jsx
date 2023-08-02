import {
  Box,
  Button,
  Container,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import greentick from "../../assets/greentick.gif"
import React, { useEffect, useState } from "react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
const AllOrder = () => {
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const { data } = await axios.get("api/v1/orders/fetchOrders");
        setResponse(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrders();
  }, []);
  console.log(response);
  return (
    <Box w={"full"}>
      <Container w={"full"} maxW={"1440px"} margin={"0 auto"}>
        <Box w={"full"}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User Name</Th>
                  <Th>Order Id</Th>
                  <Th>Transaction Id</Th>
                  <Th>Payment Status</Th>
                  <Th>Order Date</Th>
                  <Th>Delivery Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {response.map((ele) => {
                  return (
                    <Tr>
                      <Td>{ele.userId}</Td>
                      <Td>{ele.orderId}</Td>
                      <Td>{ele.razorpayPaymentId}</Td>
                      <Td>
                        {ele.isPaid ? (
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={"0.5rem"}
                          >
                            <Text>Paid</Text>
                            <Image w={"30px"} src={greentick} />
                          </Box>
                        ) : (
                          "Not Paid"
                        )}
                      </Td>
                      <Td>{Date(ele.createdAt).split(" GMT")[0]}</Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={Button}
                            rightIcon={<BsFillArrowDownCircleFill />}
                            variant={'ghost'}
                          >
                            Delivery Status
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Processing</MenuItem>
                            <MenuItem>Shipped</MenuItem>
                            <MenuItem>Out for Delivery</MenuItem>
                            <MenuItem>Delivered</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>

                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default AllOrder;
