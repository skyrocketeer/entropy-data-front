import axios from "~plugins/axios"
import { Category, Variant } from "~types/common"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getAllCategories = (): Promise<Category[]> => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/common/categories`)
            .then(res => resolve(res.data))
            .catch(err => reject(err.response))
    })
}

export const getVariantLists = (id: number): Promise<Variant[]> => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/common/variants/${id}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err.response))
    })
}