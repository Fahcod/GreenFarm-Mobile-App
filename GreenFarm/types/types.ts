

export type User = {
    _id:string,
    name:string,
    email:string,
    profile_pic:string,
    createdAt:Date | null,
    updatedAt:Date | null
}

export type Content = {
      _id: string,
    title: string,
    content_type: 'article' | 'video',
    description: string,
    created_by: {
      _id:string,
      name:string,
      profile_pic:string
    },
    viewsCount: number,
    files: string[]
    createdAt: Date,
    updatedAt: Date,
    __v: number
}

export type Store = {
   _id: string,
    name: string,
    owner: {
      _id:string,
      name:string,
      profile_pic:string
    },
    dealing_in: string[],
    location: {
      country: string,
      city: string,
      region: string,
      _id: string
    },
    description: string,
    store_contacts: string[],
    store_profile: string,
    reviewsCount: number,
    subscription: {
      plan: string,
      start_date: Date,
      end_date: Date,
      is_active: boolean,
      _id: string
    },
    createdAt: Date,
    updatedAt: Date,
    __v: number
}

export type Product = {
    _id: string,
    title: string,
    price: number,
    description: string,
    store: {
      _id:string,
      name:string,
      store_profile:string,
      description:string,
      store_contacts:string[],
      dealing_in:string[],
      location:{
      country: string,
      city: string,
      region: string,
      _id: string
      }
    },
    images: string[],
    category: string,
    quantity: number,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}