
import React from 'react'
import ProductCard from './ProductCard'
import { dummyProducts } from './../greencart_assets/assets';
import { useAppContext } from '../context/AppContext';

function BestSeller() {
    const { products } = useAppContext()
    return (
        <div className='mt-16 '>
            <h1 className='text-2xl md:text-3xl font-medium'>Best Seller</h1>
            <div className='flex grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-2' >
                {
                    products.filter((product) => product.inStock).slice(0, 5).map((product, i) => (

                        (
                            <ProductCard key={i} product={product} />)

                    ))
                }

            </div>
        </div>
    )
}

export default BestSeller
