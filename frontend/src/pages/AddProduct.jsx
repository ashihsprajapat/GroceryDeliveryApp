import { useState } from "react";
import { categories } from "../greencart_assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {

    const { axios } = useAppContext()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [offerPrice, setOfferPrice] = useState("")
    const [files, setFiles] = useState([])

    const handleAdd = async (e) => {
        e.preventDefault();

        try {

            const productData = {
                name,
                description, //: description.split('\n')
                price,
                offerPrice,
                category
            }

            const formData = new FormData();
            formData.append("productData", JSON.stringify(productData))

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                formData.append('images', file)
            }


            const { data } = await axios.post("/api/product/add",
                formData,


            )

            if (data.success) {
                toast.success(data.message)
                setName("");
                setDescription("");
                setPrice("");
                setOfferPrice("");
                setCategory("");
                setFiles([]);

            } else {
                toast.error(data.message)
            }

        } catch (err) {
            err.message
        }
    }


    return (
        <div className="px-10  flex flex-col justify-between bg-white">
            <form onSubmit={(e) => handleAdd(e)} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (

                            files[index] ?
                                (<img src={URL.createObjectURL(files[index])} alt="files" className="max-w-24 cursor-pointer" />

                                )
                                :

                                <label key={index} htmlFor={`image${index}`}>
                                    <input accept="image/*" type="file" id={`image${index}`} hidden
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFiles((prev) => [...prev, file]);
                                            }
                                        }} />
                                    <img className="max-w-24 cursor-pointer" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png" alt="uploadArea" width={100} height={100} />
                                </label>


                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required
                        onChange={(e) => setName(e.target.value)}
                        value={name} />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description} ></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value={category}>Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required
                            onChange={(e) => setPrice(e.target.value)}
                            value={price} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required
                            onChange={(e) => setOfferPrice(e.target.value)}
                            value={offerPrice} />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">ADD</button>
            </form >
        </div >
    );
};

export default AddProduct;