import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import type { Category, ImageType } from '~types/common'
import "react-multi-carousel/lib/styles.css";
import Carousel from '~components/Carousel';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
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
import { Layout } from '~components/Layout'
import { FaMapMarkerAlt, FaLink } from 'react-icons/fa'
import { FiFile } from 'react-icons/fi'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FileUpload from '~components/Input/FileUpload'
import Map from '~components/Map'
import { useRecoilState } from 'recoil'
import { categoriesList, variantList } from '~store/common'
import { useCategories, useVariants } from '~hooks'
import withAuth from '~components/HOC/WithAuth'
import { Variant } from 'framer-motion';

const schema = yup.object().shape({
  review: yup.string().required("Vui lòng nhập nhận xét."),
  address: yup.string().required("Vui lòng nhập địa chỉ "),
  placeName: yup.string().required('Vui lòng nhập địa điểm.'),
  imgExternalLink: yup.string(),
  imgGalleries: yup.array().of(yup.string()),
  category: yup.number().required("Vui lòng chọn danh mục").typeError('Vui lòng chọn danh mục.'),
  variant: yup.number().required().typeError('Vui lòng chọn danh mục.'),
});

type FormValues = {
  review: string
  files?: FileList | null
  imgExternalLink?: string
  imgGalleries: () => []
  address: string
  placeName: string
  category: number | null
  variant: number | null
}

const initialValues = {
  review: '',
  files: null,
  imgExternalLink: '',
  imgGalleries: [],
  address: '',
  placeName: '',
  category: null,
  variant: null
}

function NewReview() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenImgLink,
    onOpen: onOpenLinkModal,
    onClose: onCloseLinkModal
  } = useDisclosure()
  const { register, watch, getValues, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues
  })

  const [categories, setCategories] = useRecoilState<Category[]>(categoriesList)
  const [variants, setVariants] = useRecoilState<Variant[]>(variantList)

  useEffect(() => {
    if (!categories.length) {
      (async () => {
        try {
          const catListFromAPI = await useCategories()
          setCategories(catListFromAPI)
        } catch (e) {
          console.log(e)
        }
      })()
    }
  }, [])

  useEffect(() => {
    if (getValues('category') != null) {
      (async () => {
        try {
          const variantList = await useVariants(getValues('category'))
          setVariants(variantList)
        } catch (e) {
          console.log(e)
        }
      })()
    }
  }, [getValues('category')])

  const [imgGalleries, setGalleries] = useState<ImageType[]>([])

  const addToGallery = () => {

    // if (getValues('imgExternalLink')) {
    //   setGalleries([...imgGalleries, getValues('imgExternalLink')])
    // }

    onCloseLinkModal()
  }

  const [data, setData] = useState<FormValues>();

  const onSubmit = (data: FormValues) => {
    if (data.files != undefined) {
      const valid = validateFiles(data.files)
      if (!valid)
        return console.log(errors)

      console.log(data)
      setData(data)
    }
    else return console.log(errors)
  }

  const handleImgUpload = (img: { src: string | ArrayBuffer | null, title: string }) => {
    setGalleries([
      ...imgGalleries,
      { src: img.src, name: img.title }
    ])
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

  return (
    <Layout>
      <Center>
        <Box w={['100%', '100%', '80%']} py='3' px='4' borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow='lg'>
          <form>
            <FormControl my='3' isRequired
              isInvalid={!!errors?.placeName?.message}
            >
              <FormLabel color='green.300' fontWeight='semibold' mb='2' > Tên địa điểm </FormLabel>
              <Input id="email" type="text" placeholder='New store' {...register("placeName")} />
              <FormErrorMessage>{errors?.placeName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="location" my='3' isRequired isInvalid={!!errors?.address?.message}>
              <Box>
                <FormLabel color='green.300' fontWeight='semibold' mb='2'> Địa chỉ </FormLabel>
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
              <Select placeholder="Select category"
                color='gray.600'
                {...register("category")}
                className='capital-case'
              >
                {categories.map(cat => (
                  <option value={cat.id} key={cat.name}>{cat.name}</option>
                ))
                }
              </Select>
              <FormErrorMessage>{errors?.category?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="variant" my='3' isRequired
              isInvalid={!!errors?.variant?.message}
            >
              <FormLabel color='green.300' fontWeight='semibold' mb='2'> Loại hình kinh doanh </FormLabel>
              {/* <Select placeholder="Select variants"
                color='gray.600' {
                ...register("variant")}
                disabled={watch('category') == null}
              >
                {variantList}
                <option value='1'>Boutique</option>
                <option value='2'>Flower shop</option>
                <option value='3'>Football field</option>
              </Select> */}
              <FormErrorMessage>{errors?.variant?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.files} isRequired>
              <FormLabel color='green.300' fontWeight='semibold' mb='2'>
                Hình ảnh
              </FormLabel>
              <HStack spacing={4}>
                <Box w='fit-content'>
                  <FileUpload
                    accept={'image/*'}
                    multiple
                    register={register('files')}
                    onPreviewImg={handleImgUpload}
                  >
                    <Button leftIcon={<Icon as={FiFile} />} size='sm' bg='blue.500' color='white'>
                      Upload
                    </Button>
                  </FileUpload>
                </Box>
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

              {imgGalleries.length ?
                <Box mt={5} pt={5}>
                  <Carousel imgSet={imgGalleries} />
                </Box> : null
              }

              <FormErrorMessage>
                {errors?.files?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="location" my='3' isRequired isInvalid={!!errors?.review?.message}>
              <Box>
                <FormLabel color='green.300' fontWeight='semibold' mb='2'> Danh gia cua ban </FormLabel>
              </Box>
              <Textarea
                placeholder="Nhap danh gia ve dia diem nay"
                {...register("review")}
              />
              <FormErrorMessage>
                {errors?.review?.message}
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

export default withAuth(NewReview)