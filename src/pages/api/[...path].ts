import httpProxy from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import type { IncomingMessage, ServerResponse } from 'http'
import type { API_Error } from '~types/api_error'

const proxy = httpProxy.createProxyServer()

// You can export a config variable from any API route in Next.js.
// We'll use this to disable the bodyParser, otherwise Next.js
// would read and parse the entire request body before we
// can forward the request to the API. By skipping the bodyParser,
// we can just stream all requests through to the actual API.
export const config = {
  api: {
    bodyParser: false
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.on('error', (err) => {
    console.log('handle api response error', err)
  })
  /* Return a Promise to let Next.js know when we're done
  ** processing the request:
  */
  return new Promise<void>((resolve, reject) => {
    // we'll need these to intercept the API response.
    const isLogin = req.url === '/api/auth/login'
    const isLogout = req.url === '/api/auth/logout'

    // Get the `auth-token` cookie
    const authToken = parseCookies({ req })['auth-token']

    // Rewrite the URL: strip out the leading '/api'.
    // For example, '/api/login' would become '/login'.
    // ️You might want to adjust this depending
    // on the base path of your API.
    req.url = req.url?.replace(/^\/api/, '')

    // Don't forward cookies to the API:
    req.headers.cookie = ''

    if (authToken) {
      req.headers.authorization = authToken
    }

    // In case the request is for login, we need to
    // intercept the API's response. It contains the
    // auth token that we want to strip out and set
    // as an HTTP-only cookie.
    proxy
      .once('proxyRes', (proxyRes: IncomingMessage, request: IncomingMessage, response: ServerResponse) => {
        // in case of logout, clear the cookies and return
        if (isLogout) {
          destroyCookie({ res }, 'auth-token', {
            path: "/",
          })
          response.statusCode = 200
          response.write(JSON.stringify(
            { message: 'Logged out successfully', status: 'OK' }
          ))
          response.end()
          resolve()
          return
        }
        else if (isLogin) {
          // Read the API's response body from
          // the stream:
          let apiResponseBody: string
          proxyRes.on('data', (chunk) => {
            apiResponseBody = chunk.toString('utf8')
            // console.log("This is the data from target server : " + apiResponseBody)
          })

          // Once we've read the entire API
          // response body, we're ready to
          // handle it:
          proxyRes.on('end', () => {
            if (proxyRes.statusCode !== 200) {
              const parsedAPI: API_Error = JSON.parse(apiResponseBody)
              res.send({
                statusCode: Number(parsedAPI.status) || 500, // set to 500 code if status is NaN
                error: parsedAPI.error,
                message: parsedAPI.message
              })
              response.end()
              reject()
              return
            }

            try {
              // Extract the authToken from API's response:
              const { accessToken, tokenType } = JSON.parse(apiResponseBody)

              // Set the authToken as an HTTP-only cookie.
              // We'll also set the SameSite attribute to
              // 'lax' for some additional CSRF protection.
              setCookie({ res }, 'auth-token', `${tokenType} ${accessToken}`, {
                maxAge: 60 * 60,
                path: '/',
                sameSite: true,
                secure: true
              })
              // Our response to the client won't contain
              // the actual authToken. This way the auth token
              // never gets exposed to the client.
              response.statusCode = 200
              response.end()
              resolve()
              return
            } catch (err) {
              reject(err)
              return
            }
          })
        }
        else
          resolve()
        return
      })
      .once('error', (err) => reject(err))
      .web(req, res, {
        target: process.env.API_URL,
        autoRewrite: false,
        selfHandleResponse: isLogin,
      })
  })
}