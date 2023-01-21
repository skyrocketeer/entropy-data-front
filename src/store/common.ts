import { Variant } from "framer-motion"
import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'
import { Category } from "~types/common"

// const { persistAtom } = recoilPersist({ key: '__entropy' })

export const categoriesList = atom({
    key: 'categories',
    default: [] as Category[]
})

export const variantList = atom({
    key: 'variants',
    default: [] as Variant[]
})

// export const categoriesList = selector({
//     key: 'categories',
//     get: ({get}) => {...initialState },
//     // effects_UNSTABLE: [persistAtom],
//     // set: ({set}, newValue) => 
// })