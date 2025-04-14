import axios from "axios"

export const createCategory = async(token, form) => {
    return await axios.post('http://localhost:3000/api/category', form, {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    })
}

export const listCategory = async(token) => {
    return await axios.get('http://localhost:3000/api/category', {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    })
}

export const removeCategory = async(token, id) => {
    return await axios.delete('http://localhost:3000/api/category/'+id, {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    })
}