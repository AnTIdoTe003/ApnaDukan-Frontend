import { Box } from '@chakra-ui/react'
import React from 'react'
import '../Admin/admin-menu.scss'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import CreateCategory from './CreateCategory';
import CreateProduct from './CreateProduct';
import Users from './Users';
import AllOrder from './AllOrder';
const AdminMenu = () => {
  return (
    <Box>
          <Tabs variant='soft-rounded' colorScheme='green' size="md">
            <TabList>
              <Tab>Create Category</Tab>
              <Tab>Create Product</Tab>
              <Tab>All Users</Tab>
              <Tab>All Orders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CreateCategory></CreateCategory>
              </TabPanel>
              <TabPanel>
                <CreateProduct></CreateProduct>
              </TabPanel>
              <TabPanel>
                <Users></Users>
              </TabPanel>
              <TabPanel>
                <AllOrder/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      
  );
}

export default AdminMenu