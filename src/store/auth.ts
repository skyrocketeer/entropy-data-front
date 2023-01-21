import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'
import type { UserProfile } from "~types/common"

const { persistAtom } = recoilPersist({ key: '__entropy' })

export const isLoggedIn = atom<boolean>({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const userData = atom<UserProfile | null>({
  key: "userProfile",
  default: null,
  effects_UNSTABLE: [persistAtom],
})