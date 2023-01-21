import {
  Avatar,
  Box,
  Text,
  Flex,
  Button,
  Icon,
  useDisclosure,
  useColorMode,
  Switch,
  Image,
  HStack,
  LightMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedIn, userData } from "~store/auth";

import {
  RiMoonClearFill,
  RiSunLine,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import { UserProfile } from "~types/common";
import { useLogout } from "~hooks";


export const NavBar = () => {
  const router = useRouter()

  // color mode
  const { colorMode, toggleColorMode } = useColorMode()


  // global state
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  /* begin
  ** since local storage is only available in client (browser)
  ** so need to set in here to get rid of the complaint of not matching 
  ** HTML rendered between the server and client
  */
  const [isAuthStore, setAuthStore] = useRecoilState(isLoggedIn)
  const [userStore, setUserStore] = useRecoilState(userData)

  useEffect(() => {
    setAuth(isAuthStore)
    setUser(userStore)
  }, [])
  /** end */

  const handleLogout = async () => {
    setAuth(false)
    setUser(null)

    // clear app global state
    await setAuthStore(false)
    await setUserStore(null)

    //need this to clear cookies session and local storage
    useLogout()
    return router.push('/account/login')
  }

  // Drawer
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const renderNoAuth = () => (
    <>
      <NextLink href="/account/login">
        <Button
          colorScheme="green"
          size='sm'
          shadow='md'
          borderRadius='xl'
        >
          Login
        </Button>
      </NextLink>
      <NextLink href="/account/register">
        <Button
          variant="outline"
          color="green.400"
          size='sm'
          shadow='md'
          borderRadius='xl'
        >
          Sign Up
        </Button>
      </NextLink>
    </>
  )

  const renderIsAuth = () => (
    <>
      <Box display='flex' justifyContent="space-between" alignItems="center">
        {user?.username && user.username.length > 12 ?
          (
          <Text mr={4}>
              {user?.username}
          </Text>
        ) : (
          <Text fontSize="sm" mr={2}>
              {user?.username}
          </Text>
        )}
        <Avatar
          size="sm"
          name={user?.username}
          src={user && user?.profileImgUrl != null ? user.profileImgUrl : undefined}
          mr={1}
        />
      </Box>
      <Box>
        <LightMode>
          <Button colorScheme='red'
            size='sm'
            borderRadius='xl'
            shadow='md'
            onClick={handleLogout}
          >
            Log out
        </Button>
        </LightMode>
      </Box>
    </>
  )

  return (
    <Box
      fontWeight={700}
      p='16px 24px'
      boxShadow='sm'
      bg={colorMode === "light" ? 'white' : 'blackAlpha.500'}
    >
      <Flex
        alignItems="center"
        w='80%'
        m='auto'
        justifyContent='space-between'
      >
        <Box mr={2}>
          {" "}
          <NextLink href="/">
            <Flex cursor="pointer" fontSize="large" alignItems="center">
              <Image
                w="36px"
                mr={4}
                src={
                  colorMode === "light"
                    ? "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616222866/Group_6_2x_ukk0nq.png"
                    : "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616223149/Group_6_2x_j03v2s.png"
                }
              />
              <Text fontSize="20px" fontWeight="600" color='green.500'>
                ENTROPY DATA
              </Text>
            </Flex>
          </NextLink>
        </Box>
        <HStack spacing={6}>
          {isAuth && user != null ? renderIsAuth() : renderNoAuth()}
          <Box>
            <Icon as={RiSunLine} aria-label='' w={4} h={4} />
            <Switch
              onChange={toggleColorMode}
              colorScheme="teal"
              isChecked={colorMode === "dark"}
              size="md"
              mx='4px'
            />
            <Icon as={RiMoonClearFill} aria-label='' w={4} h={4} />
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};
