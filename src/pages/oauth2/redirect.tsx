import axios from "axios";
import type { NextPageContext } from "next";
import { useRouter } from "next/router";
import nookies from 'nookies'
import { useRecoilState } from "recoil";
import { userData } from "~store/auth";
import { parseTokenFromUrl, isClient } from "~utils/helper";

export function getServerSideProps(ctx: NextPageContext) {
  // Set cookies
  nookies.set(ctx, 'auth-token', 'Bearer ' + parseTokenFromUrl(ctx.req?.url || ''), {
    maxAge: 60,
    path: '/',
    sameSite: true,
    secure: true
  })
  return {
    props: {}, // will be passed to the page component as props
  }
}

const RedirectSocialLogin = () => {
  const [user, setUser] = useRecoilState(userData)
  axios.get('/api/user/me')
    .then((res) => {
      setUser(res.data)
      if (isClient) {
        const router = useRouter()
        router.push('/account/profile')
      }
    })
    .catch(err => console.log(err))

  return <span>Redirecting ...</span>
}

export default RedirectSocialLogin