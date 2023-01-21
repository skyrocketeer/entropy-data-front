import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useRecoilState } from 'recoil';
import * as yup from 'yup';
import { Layout } from '~components/Layout';
import { useUserProfile } from '~hooks';
import { isLoggedIn, userData } from '~store/auth';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

type LoginFormInput = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [isSubmitting, setIsSubmit] = useState(false)
  const [isAuth, setAuth] = useRecoilState(isLoggedIn)
  const [user, setUser] = useRecoilState(userData)

  const textBg = useColorModeValue("white", "blackAlpha.700")

  const router = useRouter()

  const getUser = (): Promise<void> => {
    return useUserProfile()
      .then(async (userProfile) => {
        await setUser(userProfile);
        return Promise.resolve();
      })
      .catch((err) => Promise.reject(err.response));
  };

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: LoginFormInput) => {
    setIsSubmit(true)

    axios
      .post('/api/auth/login', values)
      .then(async () => {
        setAuth(true);
        await getUser();
        router.push('/account/profile');
      })
      .catch((err) => console.log('error in client', err));
  }

  return (
    <Layout>
      <Center w='100%' __css={{ flexDirection: 'column' }}>
        <form style={{ width: 350 }}>
          <FormControl
            isInvalid={!!errors?.email?.message}
            errortext={errors?.email?.message}
            pb='4'
            px='4'
            isRequired
          >
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              id='email'
              placeholder='Email'
              {...register('email')}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.password?.message}
            errortext={errors?.password?.message}
            px='4'
            pb='4'
            isRequired
          >
            <FormLabel>Password</FormLabel>
            <Input
              id='password'
              type='password'
              placeholder='Password'
              autoComplete={'false'}
              {...register('password')}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <Box w='100%' margin='10px 0' display='flex'>
            <Button
              onClick={handleSubmit(onSubmit)}
              borderRadius='lg'
              w='320px'
              margin='auto'
              colorScheme='green'
              disabled={!!errors.email || !!errors.password || isSubmitting}
              isLoading={isSubmitting}
              loadingText='Submitting'
            >
              Login
            </Button>
          </Box>
        </form>

        <Wrap direction='column' spacing='10px' justify='center' w='400px'>
          <WrapItem>
            <Center
              as='a'
              href={process.env.NEXT_PUBLIC_FACEBOOK_AUTH_URL}
              h='40px'
              margin='auto'
              w='80%'
              borderRadius='lg'
              bg='facebook.500'
              color='white'
            >
              <FaFacebook />
              <Box as='span' fontSize='sm' marginLeft='10px'>
                Login with Facebook
              </Box>
            </Center>
          </WrapItem>
          <WrapItem>
            <Center
              as='a'
              href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}
              h='40px'
              margin='auto'
              w='80%'
              borderRadius='lg'
              bg='gray.100'
              color='black'
            >
              <FcGoogle />
              <Box as='span' fontSize='sm' marginLeft='10px'>
                Login with Google
              </Box>
            </Center>
          </WrapItem>
        </Wrap>
      </Center>
    </Layout>
  );
}