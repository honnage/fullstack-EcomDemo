import axios from 'axios'
import {create} from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from '../api/category';
import { listProduct } from '../api/product';

const ecomStore = (set) => ({
    user: null,
    token: null,
    categories: [],
    products: [],

    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:3000/api/login', form)
        // console.log(res.data.token)
        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    },

    getCategory: async(token) => {
        try {
          const res = await listCategory(token)
          set({categories: res.data})
        } catch (err) {
          console.log(err)
        }
    },

    getProduct: async(token, count) => {
        try {
          const res = await listProduct(token, count)
          set({products: res.data})
        } catch (err) {
          console.log(err)
        }
    },
    
})

const userPersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage)
}

const useEcomStore = create(persist(ecomStore, userPersist))

export default useEcomStore