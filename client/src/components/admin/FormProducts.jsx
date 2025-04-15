/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "../admin/UploadFile";
import { Link } from "react-router-dom";

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
};

const FormProducts = () => {
    const token = useEcomStore((state) => state.token);
    const getCategory = useEcomStore((state) => state.getCategory);
    const categories = useEcomStore((state) => state.categories);

    const getProduct = useEcomStore((state) => state.getProduct);
    const products = useEcomStore((state) => state.products);
    // console.log(products)

    const [form, setForm] = useState(initialState);

    useEffect(() => {
        getCategory(token)
        getProduct(token, 20)

    }, []);
    //   console.log("x", categories);

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
            const res = await createProduct(token, form)
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
            console.log(res)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md">
            FormProducts
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
                    เพิ่มสินค้า
                </button>

                <hr />
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-gray-200 border">
                            <th scope="col">No.</th>
                            <th scope="col">รุปภาพ</th>
                            <th scope="col">ชื่อสินค้า</th>
                            <th scope="col">รายละเอียด</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">จำนวน</th>
                            <th scope="col">จำนวนที่ขายได้</th>
                            <th scope="col">วันที่อัปเดต</th>
                            <th scope="col">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => {
                            // console.log(item)
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        {
                                            item.images.length > 0
                                            ? <img className="w-24 h-24 rounded-lg  shadow-md" src={item.images[0].url}/>
                                            : <div className="w-24 h-24 bg-gray-200 rounde-md flew items-center justify-center">No Image</div>
                                        }
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.sold}</td>
                                    <td>{item.updatedAt}</td>
                                    <td>
                                        <p className="bg-yellow-500 rounded-md shadow0md"><Link to={'/admin/product/'+ item.id}>แก้ไข</Link></p>
                                        <p><Link>ลบ</Link></p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </form>
        </div>
    );
};

export default FormProducts;
