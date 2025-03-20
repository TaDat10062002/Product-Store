import { Box, Heading, HStack, IconButton, Image, Text, useToast, useColorModeValue, Modal, useDisclosure, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, VStack, Input, Button, ModalBody, ModalFooter } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from 'react'
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { deleteProduct, updateProduct } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const bg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.600", "gray.200");

    const handleDeleteProduct = async (id) => {
        const { success, message } = await deleteProduct(id);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            })
        }
    }

    const handleUpdateProduct = async (id, updatedProduct) => {
        await updateProduct(id, updatedProduct);
        onClose();
    }

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={'2'}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} mb={'4'} color={textColor}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue'>Edit</IconButton>
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'>Delete</IconButton>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                name='price' type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent >
            </Modal>
        </Box>
    )
}
export default ProductCard