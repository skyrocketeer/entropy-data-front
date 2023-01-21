import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Layout } from '~components/Layout'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().max(20).required(),
  password: yup.string().min(8).required(),
  birthDate: yup.date().typeError('Vui long nhap ngay thang nam sinh')
});

type RegisterFormInput = {
  email: string;
  username: string
  password: string
  birthDate: Date
};

export default function RegisterForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmit] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInput>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: RegisterFormInput) => {
    setIsSubmit(true)

    const payload = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
      birthDate: dayjs(formData.birthDate).format("YYYY-MM-DD")
    }

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
            <FormLabel>Tên</FormLabel>
            <Input
              id='username'
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
            <FormLabel>Mật khẩu</FormLabel>
            <Input
              id='password'
              type='password'
              placeholder='Password'
              autoComplete="off"
              {...register("password")}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.birthDate?.message}
            errortext={errors?.birthDate?.message}
            px='4'
            pb='4'
            isRequired
          >
            <FormLabel>Ngày sinh</FormLabel>
            <Input
              id='dob'
              type='date'
              {...register("birthDate")}
            />
            <FormErrorMessage>{errors?.birthDate?.message}</FormErrorMessage>
          </FormControl>
          <Button
            onClick={handleSubmit(onSubmit)}
            mt='4'
            mx='4'
            w='90%'
            colorScheme='green'
            disabled={!!errors.email || !!errors.password || !!errors.birthDate || isSubmitting}
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Create an account
          </Button>
        </form>
      </Center>
    </Layout>
  );
}