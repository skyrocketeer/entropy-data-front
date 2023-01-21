import { useRouter } from 'next/router'
import type { NextPage } from "next"
import { useLogout } from "~hooks"
import { isClient } from '~utils/helper'

function withAuth<CP = {}, IP = CP>
    (WrappedComponent: NextPage<CP, IP>): NextPage<CP, IP> {
    const WithConditionalRedirectWrapper: NextPage<CP, IP> = (props: any) => {
        if (isClient) {
            const router = useRouter()
            if (!props.token || props.token == null) {
                useLogout()
                router.push('/account/login')
                return <WrappedComponent {...props} />
            }
        }
        return <WrappedComponent {...props} />
    }

    // WithConditionalRedirectWrapper.getInitialProps = async (ctx): Promise<IP> => {
    //     // if (!isClient && ctx.req) {
    //         // Get the `auth-token` cookie
    //     //     if (!authToken && ctx.res) {
    //     //         console.log('2ff')
    //     //         ctx.res.writeHead(301, { Location: '/account/login' })
    //     //         ctx.res.end()
    //     //     }
    //     // }

    //     const componentProps =
    //         WrappedComponent.getInitialProps &&
    //         (await WrappedComponent.getInitialProps(ctx))

    //     return { ...(componentProps as IP) }
    // }

    return WithConditionalRedirectWrapper
}

export default withAuth