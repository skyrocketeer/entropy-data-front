import axios from '~plugins/axios';

export const useUserProfile = () => {
  return axios.get('/api/user/me')
    .then((res) => res.data)
    .catch(err => err)
}