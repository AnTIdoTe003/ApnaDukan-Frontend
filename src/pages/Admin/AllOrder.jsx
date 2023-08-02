import {
  Box,
  Container,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import greentick from "../../assets/greentick.gif";
import React, { useEffect, useState } from "react";
import Preview from "../../components/Preview/Preview";
import UserName from "./UserName";
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
  const updateDeliveryStatus = async (value, orderId) => {
    try {
      const { data } = await axios.put(
        `api/v1/orders/update-delivery?orderId=${orderId}`,
        { deliveryStatus: value }
      );
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box w={"full"}>
      <Container w={"full"} maxW={"1920px"} margin={"0 auto"}>
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
                  <Th>Order Preview</Th>
                </Tr>
              </Thead>
              <Tbody>
                {response.map((ele) => {
                  return (
                    <Tr>
                      <Td>
                        <UserName id={ele.userId} />
                      </Td>
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
                        <select
                          onChange={(e) =>
                            updateDeliveryStatus(e.target.value, ele.orderId)
                          }
                        >
                          <option selected disabled>
                            Current Status :- {ele.isDelivered}
                          </option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">
                            Out for Delivery
                          </option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </Td>
                      <Td>
                        <Preview id={ele.orderId} />
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
