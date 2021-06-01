import { Center } from "@chakra-ui/layout"
import { Layout } from '~components/Layout/Private'
import { userData } from '~store/auth';
import { useRecoilState } from "recoil";
import { Icon, Box, Avatar, Text, HStack, VStack, Button } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import axios from '~plugins/axios';
import { FaBookOpen, FaGrinStars, FaStar, FaKissWinkHeart, FaSadTear, FaUserPlus } from "react-icons/fa";
import type { IconType } from 'react-icons'

export default function Profile() {
  const [user, setUser] = useRecoilState(userData)
  const [isFollowing, setFollow] = useState(false)
  const [love, giveLove] = useState(false)

  useEffect(() => {
    if (user == null) {
      axios.get('/api/user/me')
        .then((res) => {
          setUser(res.data)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [user])

  function Feature({ icon, desc }: { icon: IconType, desc: string }) {
    return (
      <Box w='120px'>
        <Icon as={icon} />
        <Text as='span' fontSize='sm' ml={1}>{desc}</Text>
      </Box>
    )
  }

  function setFollowing() {
    setFollow(!isFollowing)
  }

  function setLove() {
    giveLove(!love)
  }

  return (
    <Layout>
      <Center>
        <Box w={['100%', '100%', '70%', '60%']}
          borderWidth="1px" borderRadius="lg"
          overflow="hidden" boxShadow='lg'
        >
          <Center background='green.300' flexDirection='column' p='20px 0'>
            <Avatar size="xl" showBorder
              name={user?.username}
              src="https://cafefcdn.com/thumb_w/650/203337114487263232/2021/5/25/photo1621929495782-16219294961481124959497.jpg"
            />
            <Text mt='3' color='white' fontSize='md'>
              {user?.email}
            </Text>
            <Text color='white' fontSize='sm'>
              developer
            </Text>
            <HStack color='white' spacing='4' mx='auto'>
              <Feature
                icon={FaBookOpen}
                desc={user?.provider} />
              <Feature icon={FaGrinStars}
                desc={user?.role} />
              <Feature icon={FaStar}
                desc='3000 ratings' />
            </HStack>
            <HStack spacing='20' mt='3'>
              <Button px='8'
                leftIcon={!love ? <FaKissWinkHeart /> : <FaSadTear />}
                variant='outline'
                bg={love ? 'pink.500' : 'transparent'}
                color='white'
                _hover={{ bg: 'green.400' }}
                shadow='lg'
                onClick={setLove}
              >
                {!love ? 'I love this user' : 'I hate this user'}
              </Button>
              <Button px='8' leftIcon={!isFollowing ? <FaUserPlus /> : undefined}
                variant={isFollowing ? 'solid' : 'outline'}
                bg={isFollowing ? 'white' : 'transparent'}
                color={isFollowing ? 'green.500' : 'white'}
                _hover={{ bg: 'green.400' }}
                shadow='lg'
                onClick={setFollowing}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </HStack>
          </Center>
          <Box px='2' py='3'>
            <Box d="flex" alignItems="baseline" flexDir='column'>
              <Box as='a' href='/'
                shadow='md'
                borderWidth='1px'
                borderRadius='md'
                borderColor='blue.300'
                letterSpacing="wide"
                ml='3'
              >
                <Text py='2' px='4' color="blue.300" fontWeight="semibold" fontSize="xs">Edit my profile</Text>
              </Box>
            </Box>
            <Box
              ml='3'
              py='5'
              fontWeight='bold'
              fontSize='2xl'
            >
              LATEST REVIEWS
              <VStack align='left' spacing='5' my='3'>
                <Box w='60%' borderWidth="1px" borderRadius="md" overflow="hidden" boxShadow='sm'>
                  test
                </Box>
                <Box w='60%' borderWidth="1px" borderRadius="md" overflow="hidden" boxShadow='sm'>
                  cho hinh chop sabcd
                </Box>
              </VStack>
            </Box>
          </Box>
        </Box>
      </Center>
    </Layout>
  )
}