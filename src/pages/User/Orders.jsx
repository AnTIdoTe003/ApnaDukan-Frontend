import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import {
  Box,
  Container,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import greentick from "../../assets/greentick.gif";
import Preview from "../../components/Preview/Preview";
const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/orders/get-all-orders?userId=${auth.user._id}`
        );
        setOrders(data.userOrder);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserOrders();
  }, []);
  return (
    <Box w={"full"}>
      <Container w={"full"} maxW={"1440px"} margin={"0 auto"}>
        <Box w={"full"}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Transaction Id</Th>
                  <Th>Payment Status</Th>
                  <Th>Order Date</Th>
                  <Th>Delivery Status</Th>
                  <Th>Preview</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((ele) => {
                  return (
                    <Tr key={ele._id}>
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
                        <Text>{ele.isDelivered}</Text>
                      </Td>
                      <Td cursor={"pointer"}>
                          <Preview id={ele.orderId}/>
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

export default Orders;
