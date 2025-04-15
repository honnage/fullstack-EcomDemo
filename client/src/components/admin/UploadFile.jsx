/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFile, uploadFile } from '../../api/product'
import useEcomStore from '../../store/ecom-store'

const UploadFile = ({form, setForm}) => {
    const token = useEcomStore((state) => state.token) 
    const [isLoading, setIsLoading] = useState(false)
    const handleOnChange = (e) => {
        const files = e.target.files

        if (files){
            setIsLoading(true)
            let allFiles = form.images
            for(let i = 0; i < files.length; i++){
                // console.log(i)
                // Vaildate
                const file = files[i]
                if(!files[i].type.startsWith('image/')){
                    toast.error(`File ${file.name} not type image`)
                    continue
                }

                // Image Resize
                Resize.imageFileResizer(
                    files[i], 
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoid backend
                        uploadFile(token, data)
                        .then((res)=> {
                            console.log(res)

                            allFiles.push(res.data)
                            setForm({
                                ...form,
                                images: allFiles
                            })
                            toast.success('Upload image Success')
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    },
                    "base64"
                )

            }
        }
        console.log(e.target.files)
    }

    const handleDelete = (public_id) => {
        // console.log(public_id)
        const images = form.images
        removeFile(token, public_id)
        .then((res)=> {
            const fileterImages = images.filter((item, index) => {
                return item.public_id !== public_id
            })
            // console.log(fileterImages)
            setForm({
                ...form,
                images: fileterImages
            })
            toast.error(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {
                    form.images.map((item, idex) => {
                        return (
                            <div className='relative' key={idex}>
                                <img 
                                    className='w-24 h-24 hover:scale-105'
                                    src={item.url} 
                                 />
                                <span 
                                    onClick={() => handleDelete(item.public_id)}
                                    className='absolute top-0 right-0 bg-red-500 p-1 rounded-md'
                                >X
                                </span>
                            </div>
                        )
                    }) 
                }
            </div>
            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                />
            </div>
        </div>
    )
}

export default UploadFile
