import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({ key: '__entropy' })

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const userData = atom({
  key: "userProfile",
  default: null,
  effects_UNSTABLE: [persistAtom],
})