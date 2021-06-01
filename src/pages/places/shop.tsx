import { Layout } from '~components/Layout/Private'
import { Button } from "@chakra-ui/react"
import Head from 'next/head'

export default function ShopList() {

  return (
    <>
      <Head>
        <title>All shops</title>
      </Head>
      <Layout>
        <Button bgColor='green.500'>Test</Button>
      </Layout>
    </>
  )
}