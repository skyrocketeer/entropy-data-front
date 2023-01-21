import axios from '~plugins/axios'
// import type { UserProfile } from '~types/common'

export const useUserProfile = () => {
  return axios.get('/api/users/me')
    .then((res) => res.data)
    .catch(err => err)
}

export const useCategories = () => {
  return axios.get('/api/common/categories')
    .then(res => res.data)
    .catch(err => err)
}

export const useVariants = (catId: number | null) => {
  if (catId != null) {
    return axios.get(`/api/common/variants/${catId}`)
      .then(res => res.data)
      .catch(err => err.data)
  }
  else return
}

export const useLogout = () => {
  localStorage.clear()

  // remove cookies
  axios.get('/api/auth/logout')
  return
}