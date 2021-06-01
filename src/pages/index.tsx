import Head from 'next/head'
import { Layout } from '../components/Layout/Private'
import { SimpleGrid, Box, Text, Icon, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { BiClinic, BiAlbum, BiCloset, BiBasketball } from 'react-icons/bi'
import { FaTools } from 'react-icons/fa'
import { IoFlower } from 'react-icons/io5'
import { RiBuilding2Fill } from 'react-icons/ri'
import type { IconType } from 'react-icons';

type CardProps = {
  name: string,
  des: string,
  icon: IconType,
  linkTo: string
}

export default function Home() {
  const router = useRouter();
  const cardBg = useColorModeValue("white", "blackAlpha.500")

  const categories = [
    { name: "fashion stores", des: "places for clothes", icon: BiCloset, linkTo: "fashion" },
    { name: "clinics", des: "you are not gonna like these places", icon: BiClinic, linkTo: "health" },
    { name: "tools shop", des: "tell me who doesn't love DIY", icon: FaTools, linkTo: "utilities" },
    { name: "sport fields", des: "build your strength", icon: BiBasketball, linkTo: "sport" },
    { name: "flower shop", des: "gift for your honey", icon: IoFlower, linkTo: "environment" },
    { name: "dancing studio", des: "place to post videos to Tiktok", icon: RiBuilding2Fill, linkTo: "entertainment" },
    { name: "vinyl store", des: "a drink and a song for a stormy night", icon: BiAlbum, linkTo: "lifestyle" }
  ]

  const Card = ({ name, des, icon, linkTo }: CardProps): JSX.Element => (
    <Box as='a' href={`/places/${linkTo}`} shadow='md' px='10' py='5' bg={cardBg}>
      <Icon as={icon} w={12} h={12} color="green.500" mb='3' />
      <Text fontSize="xl">{name}</Text>
      <Text fontSize="sm">{des}</Text>
    </Box>
  )

  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Layout>
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="40px">
          {categories.map(cat => <Card key={cat.name} {...cat} />)}
        </SimpleGrid>
      </Layout>
    </>
  )
}
