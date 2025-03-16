import axios from 'axios'
import {create} from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";

const ecomStore = (set) => ({
    user: null,
    token: null,
    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:3000/api/login', form)
        // console.log(res.data.token)
        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    }
})

const userPersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage)
}

const useEcomStore = create(persist(ecomStore, userPersist))

export default useEcomStore