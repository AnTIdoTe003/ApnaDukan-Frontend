import React, {useEffect, useState} from 'react'
import {
  Box,  TableContainer, Table, Thead, Tr, Th, Tbody, Td, Modal, ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton, Button, useDisclosure, Input, VStack, HStack, Text
} from '@chakra-ui/react'
import axios from "axios";


const CreateCategory = () => {


  // modal conditons hook
  const { isOpen, onOpen, onClose } = useDisclosure()
  const{isOpen:isDeleteOpen, onOpen :onDeleteOpen, onClose:onDeleteClose }= useDisclosure()
  const{isOpen:isCreateOpen, onOpen :onCreateOpen, onClose:onCreateClose }= useDisclosure()
  const [allCategories, setAllCategories]= useState([])
  const [updateName, setUpdateName]= useState({
    name:''
  })
  const [createName, setCreateName]= useState({
    name:''
  })
  // console.log(updateName)
  useEffect(()=>{
    const fetchAllCategories = async ()=>{
      try {
        await  axios.get('/api/v1/category/categories').then((response)=> {
          // console.log(response.data)
          setAllCategories(response.data)
        })
            .catch((error)=>{
          console.log(error)
        })
      }catch (error){
        console.log(error)
      }
    }
    fetchAllCategories()
  },[])

  const updateCategory = async (id)=>{
    try {
      await  axios.put('api/v1/category/update-category/'+id, updateName).then(()=>{alert("Updated" +
          " Successfully")})
      window.location.reload()
    }catch (error){
      console.log(error)
    }
  }

const deleteCategory = async(id)=>{
    try{
      await  axios.delete('api/v1/category/delete-category/'+id).then(()=>{alert("Deleted" +
          " Successfully")})
      window.location.reload()
    }catch (error){
      console.log(error)
    }
}

const createCategory = async()=>{
  try{
await axios.post('api/v1/category/create-category', createName).then(()=>{alert("Created")})
window.location.reload()
  }catch(error){
    console.log(error)
  }
}

  // console.log(allCategories)
  return (
    <Box>
      <Box>
        <Box py={"1rem"}>
          <Text fontSize={"2xl"}>Create Category</Text>
          <Button onClick={onCreateOpen}>Create</Button>
          {/* Create Category Modal */}
          <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create the Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack py={"1rem"} gap={"1rem"}>
                  <Input
                    onChange={(e) => {
                      setCreateName({ ...createName, name: e.target.value });
                    }}
                  />
                  <HStack py={"1rem"} gap={"1rem"}>
                    <Button onClick={() => createCategory(createName)}>Create</Button>
                    <Button onClick={onCreateClose}>Cancel</Button>
                  </HStack>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Categories</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
            
                {allCategories.map((ele) => {
                  return (
                    <>
                      <Tr>
                      <Td>{ele.name}</Td>
                      <Td>
                        <HStack>
                          <Button onClick={onOpen}>Edit</Button>
                          <Button onClick={onDeleteOpen} colorScheme={"red"}>
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                      {/*Edit Category Modal*/}
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Enter new Category Name</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <VStack py={"1rem"} gap={"1rem"}>
                              <Input
                                onChange={(e) => {
                                  setUpdateName({
                                    ...updateName,
                                    name: e.target.value,
                                  });
                                }}
                              />
                              <Button onClick={() => updateCategory(ele._id)}>
                                Submit
                              </Button>
                            </VStack>
                          </ModalBody>
                        </ModalContent>
                      </Modal>

                      {/*Delete Category Modal*/}

                      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>
                            Do you want to Delete the Category?
                          </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <HStack py={"1rem"} gap={"1rem"}>
                              <Button onClick={() => deleteCategory(ele._id)}>
                                Yes
                              </Button>
                              <Button onClick={onDeleteClose}>Cancel</Button>
                            </HStack>
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                      </Tr>
                    </>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default CreateCategory