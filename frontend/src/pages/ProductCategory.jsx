
import React from 'react'
import { useAppContext } from './../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../greencart_assets/assets';
import ProductCard from '../components/ProductCard';

function ProductCategory() {
    const { products } = useAppContext();

    const { category } = useParams();

    const searchCategory = categories.find((item) => (item.path.toLowerCase() === category));

    const filteredProduct = products.filter((product, i) => (product.category.toLowerCase() === category))


    return (

        <div className='mt-16' >
            {
                searchCategory && (
                    <div className='flex flex-col items-end w-max' >
                        <p className='text-2xl font-medium ' >{searchCategory.text.toUpperCase()}</p>
                        <div className="w-16 h-0.5 bg-green-400">

                        </div>
                    </div>
                )
            }
            <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5  gap-5 m-2 md:gap-8 mt-6 gap-3 ' >
                {
                    filteredProduct.map((product, i) => (
                        <ProductCard key={i} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductCategory
