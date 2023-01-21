export type Category = {
    id: number
    name: string
}

export type Variant = {
    id: number
    name: string
    category: Category
}

export type ImageType = {
    src: string | ArrayBuffer | null,
    name?: string | undefined
}

export type UserProfile = {
    birthDate: string,
    email: string,
    id: number,
    profileImgUrl: string | null | undefined,
    provider: string,
    providerId: string | null,
    role: string,
    username: string
}