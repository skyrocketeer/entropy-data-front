import axios from "axios";
import type { NextPageContext } from "next";
import { useRouter } from "next/router";
import nookies from 'nookies'
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedIn, userData } from "~store/auth";
import { parseTokenFromUrl, isClient } from "~utils/helper";
import withAuth from '~components/HOC/WithAuth'
import { useUserProfile } from '~hooks'

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
  const router = useRouter();
  const [user, setUser] = useRecoilState(userData)
  const [isAuth, setAuth] = useRecoilState(isLoggedIn)

  useEffect(() => {
    useUserProfile()
      .then(userProfile => {
        setUser(userProfile)
        if (isClient) {
          router.push('/account/profile')
        }
      })
      .catch(err => console.log(err))
  }, [])

  return <span>Redirecting ...</span>
}

export default withAuth(RedirectSocialLogin)