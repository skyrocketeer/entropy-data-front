import { Layout } from '~components/Layout'
import { Button } from "@chakra-ui/react"
import Head from 'next/head'
// import withAuth from '~components/HOC/WithAuth';

function ShopList() {
    return (
        <>
            <Head>
                <title>All shops</title>
            </Head>
            <Layout>
                <Button bgColor='green.500' textColor='whiteAlpha.200'>Test</Button>
            </Layout>
        </>
    )
}

export default ShopList