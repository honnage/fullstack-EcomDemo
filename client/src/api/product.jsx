import axios from "axios"

export const createProduct = async(token, form) => {
    return await axios.post('http://localhost:3000/api/product', form, {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    })
}

export const listProduct = async(token, count = 10) => {
    return await axios.get('http://localhost:3000/api/products/'+ count, {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    })
}


export const uploadFile = async(token, form) => {
    return await axios.post('http://localhost:3000/api/images', {
        image: form
    }, {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    })
}

// export const removeProduct = async(token, id) => {
//     return await axios.delete('http://localhost:3000/api/product/'+id, {
//         headers: {
//             Authorization:  `Bearer ${token}`
//         }
//     })
// }