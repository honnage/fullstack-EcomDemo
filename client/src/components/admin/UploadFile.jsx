/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { uploadFile } from '../../api/product'
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

    return (
        <div>
            <input
                onChange={handleOnChange}
                type='file'
                name='images'
                multiple
            />
        </div>
    )
}

export default UploadFile
