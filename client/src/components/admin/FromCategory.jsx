/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react'
import useEcomStore from '../../store/ecom-store'
import { createCategory, listCategory, removeCategory } from '../../api/category'
import { toast } from 'react-toastify'

const FromCategory = () => {
  const token = useEcomStore((state) => state.token)
  const [name, setName] = useState('')
  const categories = useEcomStore((state) => state.categories)
  const getCategory = useEcomStore((state) => state.getCategory)
  // const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategory(token)
  }, [])

  // const getCategory = async(token) => {
  //   try {
  //     const res = await listCategory(token)
  //     // console.log(res.data)
  //     setCategories(res.data)
  //     // console.log(categories)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleSubmit = async(e)=> {
    e.preventDefault()
    // console.log(token, 'handleSubmit', name)
    if (!name) {
      return toast.warning('Please fill data')
    } 

    try {
      const res = await createCategory(token, {name})
      toast.success(`Add Category ${res.data} success!!!`)
      // console.log(res)
      getCategory(token)

    } catch (err) {
      console.log(err)
    }
  } 

  const handleRemove = async(id) => {
    try {
      // console.log('handleRemove', id)
      const res = await removeCategory(token, id)
      // console.log(res.data)
      toast.success(`Delete Category ${res.data.name} success!!!`)
      getCategory(token)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='container mx-auto p-4 bg-white shadow-md'>
      <h1>Category Management</h1>
      <form className='my-4' onSubmit={handleSubmit}>
        <input
          onChange={(e)=> setName(e.target.value)}
          className='border'
          type='text'
        />
        <button className='bg-blue-500'>Add Category</button>
      </form>

      <hr/>

      <ul className='list-none'>
        {
          categories.map((item, index) => {
            return <li className='flex justify-between my-2'
              key={index}>
              <span>
                {item.name}
              </span>
                <button
                  className='bg-red-500' 
                  onClick={()=> handleRemove(item.id)}>
                    Delete
                </button>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default FromCategory
