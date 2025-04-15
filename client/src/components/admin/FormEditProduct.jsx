/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "../admin/UploadFile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
};

const FormEditProducts = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state) => state.token);
    const getCategory = useEcomStore((state) => state.getCategory);
    const categories = useEcomStore((state) => state.categories);

    // console.log(products)

    const [form, setForm] = useState(initialState);

    useEffect(() => {
        getCategory(token)
        fetchProduct(token, id, form)

    }, []);
    //   console.log("x", categories);

    const fetchProduct = async(token, id, form) => {
        try {
            const res = await readProduct(token, id, form)
            console.log('trs from backend', res)
            setForm(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log(form)
            const res = await updateProduct(token, id, form)
            toast.success(`แด้ไขข้อมูล ${res.data.title} สำเร็จ`)
            // console.log(res)
            navigate('/admin/product')

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md">
            FormEditProducts
            <form onSubmit={handleSubmit}>
                <h1>เพิ่มข้อมูลสินค้า</h1>
                <input
                    type="text"
                    className="border"
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder="Title"
                    name='title'
                />

                <input
                    type="text"
                    className="border"
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder="Description"
                    name='description'
                />

                <input
                    type="number"
                    className="border"
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder="Price"
                    name='price'
                />

                <input
                    type="number"
                    className="border"
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder="Quantity"
                    name='quantity'
                />


                <select
                    className="border"
                    name="categoryId"
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                    >
                    <option value="" disabled>
                        Please Select
                    </option>
                    {categories.map((item, index) => (
                        <option key={index} value={item.id}>
                        {item.name}
                        </option>
                    ))}
                </select>

                <hr />
                <UploadFile form={form} setForm={setForm} />
    

                <hr />
                <button
                    className="bg-blue-500 p-2 rounded-md shadow-md 
                hover:scale-105 hover:-translate-y-1 hover:duration-200
                "
                >
                    แก้ไขสินค้า
                </button>

            </form>
        </div>
    );
};

export default FormEditProducts;