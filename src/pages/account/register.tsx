import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Layout } from '~components/Layout/Private'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().max(20).required(),
  password: yup.string().min(8).required(),
});

type RegisterFormInput = {
  email: string;
  username: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmit] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInput>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (payload: RegisterFormInput) => {
    setIsSubmit(true)

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, payload)
      .then(res => {
        router.push('/account/login')
      })
      .catch(err => console.log(err.response))
      .finally(() => setIsSubmit(false))
  }

  return (
    <Layout>
      <Center w='100%'>
        <form style={{ width: 350 }}>
          <FormControl
            isInvalid={!!errors?.username?.message}
            errortext={errors?.username?.message}
            px='4'
            pb='4'
            isRequired
          >
            <FormLabel>Name</FormLabel>
            <Input
              id='fullName'
              type='text'
              placeholder='Full Name'
              {...register("username")}
            />
            <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.email?.message}
            errortext={errors?.email?.message}
            pb='4'
            px='4'
            isRequired
          >
            <FormLabel>Email</FormLabel>
            <Input type='email' id='email' placeholder='Email' {...register("email")} />
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
              {...register("password")}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            onClick={handleSubmit(onSubmit)}
            mt='4'
            mx='4'
            w='90%'
            colorScheme='green'
            disabled={!!errors.email || !!errors.password || isSubmitting}
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Login
          </Button>
        </form>
      </Center>
    </Layout>
  );
}