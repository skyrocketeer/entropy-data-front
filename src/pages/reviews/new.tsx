import { useForm } from 'react-hook-form'
import {
  Box, WrapItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Image, Select,
  Input,
  InputGroup,
  InputRightAddon,
  IconButton,
  Icon, Button,
  Text, Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout"
import { Layout } from '~components/Layout/Private'
import { FaMapMarkerAlt, FaLink } from 'react-icons/fa'
import { FiFile } from 'react-icons/fi'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FileUpload from '~components/Input/FileUpload'
import Map from '~components/Map'
import { useState } from 'react';

const schema = yup.object().shape({
  review: yup.string().required("Vui lòng nhập nhận xét."),
  // address: yup.string().required(),
  placeName: yup.string().required('Vui lòng điền địa điểm.'),
  imgExternalLink: yup.string(),
  imgGalleries: yup.array().of(yup.string()),
  category: yup.number().required("Vui lòng chọn danh mục").typeError('Vui lòng chọn danh mục.'),
  variant: yup.number().required().typeError('Vui lòng chọn danh mục.'),
});

type FormValues = {
  review: string
  files?: FileList
  imgExternalLink?: string
  imgGalleries: () => []
  address: string
  placeName: string
  category: number
  variant: number
}

export default function NewReview() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenImgLink,
    onOpen: onOpenLinkModal,
    onClose: onCloseLinkModal
  } = useDisclosure()
  const { register, getValues, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const [imgGalleries, setGalleries] = useState<any>([])

  const addToGallery = () => {
    if (getValues('imgExternalLink')) {
      setGalleries([...imgGalleries, getValues('imgExternalLink')])
    }

    onCloseLinkModal()
  }

  const onSubmit = (data: FormValues) => {
    if (data.files != undefined) {
      const valid = validateFiles(data.files)
      if (!valid)
        return console.log(errors)
    }

    console.log(data)
  }

  const handleImgUpload = (base64Img: any) => {
    setGalleries([...imgGalleries, base64Img])
  }

  const validateFiles = (value: FileList) => {
    if (value.length > 1) {
      for (const file of Array.from(value)) {
        const fsMb = file.size / (1024 * 1024)
        const MAX_FILE_SIZE = 10
        if (fsMb > MAX_FILE_SIZE) {
          return false
        }
      }
    }
    return true
  }

  const BingMapSDK = () =>
    <script type='text/javascript'
      src={`http://www.bing.com/api/maps/mapcontrol?callback=drawMap&key=${process.env.NEXT_PUBLIC_BING_MAP_API}`}
      async defer
    />

  return (
    <Layout>
      <BingMapSDK />
      <Center>
        <Box w={['100%', '100%', '80%']} py='3' px='4' borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow='lg'>
          <form>
          <FormControl my='3' isRequired 
            isInvalid={!!errors?.review?.message}
          >
            <FormLabel color='green.300' fontWeight='semibold' mb='2' > Lời nhận xét của bạn </FormLabel>
            <Input id="review" type="text" placeholder='New store' {...register("review")} />
            <FormErrorMessage>{errors?.review?.message}</FormErrorMessage>
          </FormControl>
            <FormControl my='3' isRequired
              isInvalid={!!errors?.placeName?.message}
            >
              <FormLabel color='green.300' fontWeight='semibold' mb='2' > Tên địa điểm </FormLabel>
              <Input id="email" type="text" placeholder='New store' {...register("placeName")} />
              <FormErrorMessage>{errors?.placeName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="location" my='3' isRequired >
              <Box>
                <FormLabel color='green.300' fontWeight='semibold' mb='2'> Vị trí </FormLabel>
              </Box>
              <InputGroup>
                <Input type="text"
                  placeholder='21 Jump Street, 5th Avenue, New York'
                  {...register("address")}
                />
                <InputRightAddon p='0'
                  children={<IconButton aria-label="Pin on map"
                    icon={<FaMapMarkerAlt color='red' />}
                    onClick={onOpen}
                  />}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="category" isRequired
              isInvalid={!!errors?.category?.message}
            >
              <FormLabel color='green.300' fontWeight='semibold' mb='2'> Danh mục </FormLabel>
              <Select placeholder="Select category" color='gray.600' {...register("category")}>
                <option value='1'>Fashion</option>
                <option value='2'>Utilities</option>
                <option value='3'>Health</option>
                <option value='4'>Lifestyle</option>
                <option value='5'>Sport</option>
              </Select>
              <FormErrorMessage>{errors?.category?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="variant" my='3' isRequired 
              isInvalid={!!errors?.variant?.message}
            >
              <FormLabel color='green.300' fontWeight='semibold' mb='2'> Loại hình kinh doanh </FormLabel>
              <Select placeholder="Select variants" color='gray.600' {...register("variant")}>
                <option value='1'>Boutique</option>
                <option value='2'>Flower shop</option>
                <option value='3'>Football field</option>
              </Select>
              <FormErrorMessage>{errors?.variant?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.files} isRequired>
              <FormLabel color='green.300' fontWeight='semibold' mb='2'>
                Hình ảnh
              </FormLabel>
              <HStack spacing='3'>
                <FileUpload
                  accept={'image/*'}
                  multiple
                  register={register('files')}
                  onPreviewImg={handleImgUpload}
                  w='fit-content'
                >

                  <Button leftIcon={<Icon as={FiFile} />} size='sm' bg='blue.500' color='white'>
                    Upload
                  </Button>
                </FileUpload>
                <Text>or</Text>
                <Button leftIcon={<Icon as={FaLink} />}
                  size='sm' bg='blue.500' color='white'
                  onClick={onOpenLinkModal}
                >
                  Link to image
                  </Button>
                <Modal size='sm' isCentered
                  closeOnOverlayClick={false}
                  onClose={onCloseLinkModal}
                  isOpen={isOpenImgLink}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalBody>
                      <Input placeholder='insert your link' {...register('imgExternalLink')} />
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onCloseLinkModal}>
                        Close
                    </Button>
                      <Button variant="ghost" onClick={addToGallery}>Secondary Action</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </HStack>

              <HStack spacing={4} my='4'>
                {imgGalleries.length ?
                  imgGalleries.map((pic: any) => (
                    <WrapItem
                      key={pic.title}
                      flexDir="column"
                      boxShadow="base"
                      rounded="20px"
                      overflow="hidden"
                      bg="white"
                      lineHeight="0"
                      _hover={{ boxShadow: "xl" }}
                    >
                      <Image src={pic.src}
                        height={250} width={250} />
                      <Text>{pic.title}</Text>
                    </WrapItem>
                  ))
                  :
                  Array(3)
                    .fill("")
                    .map((_, i) => (
                      <Box key={i}
                        my='4'
                        boxShadow="base"
                        rounded="20px"
                        overflow="hidden"
                        bg="gray.300"
                        lineHeight="0"
                        _hover={{ boxShadow: "xl" }}
                        w="150px" h="150px"
                      />
                    ))
                })
              </HStack>

              <FormErrorMessage>
                {errors.files && errors?.files.message}
              </FormErrorMessage>
            </FormControl>

            <Center>
              <Button my='3' bg='green.400' color='white'
                onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Center>
          </form>
        </Box>

        <Modal size='xl' onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody p='1'>
              <Map />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>
    </Layout>
  )
}