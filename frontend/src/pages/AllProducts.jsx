
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import ProductCard from './../components/ProductCard';

function AllProducts() {
    const { products, navigate, searchQuery, setSearchQuery } = useAppContext();
    const [filterProduct, setFilterProduct] = useState([]);
  

   // console.log( 'filter data is ',filterProduct)

    useEffect(() => {

        if (searchQuery.length > 0) {
            setFilterProduct(products.filter(product => (
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )))
        } else {
            setFilterProduct(products);
        }


    }, [products, searchQuery])


    useEffect(() => {
        if(searchQuery.length >0){
            navigate("/products")
        }

    }, [searchQuery, products])



    return (
        <div className='mt-16  flex flex-col '>
            <div className='flex flex-col items-end w-max' >
                <h1 className='text-2xl md:3xl  font-medium uppercase'> All Products</h1>
                <div className='w-16 h-0.5 bg-green-200 rounded-full' ></div>
            </div>


            <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5  gap-2 md:gap-8 mt-6' >
                {
                    filterProduct.filter((product) => product.inStock).map((product, i) => (

                        (
                            <ProductCard key={i} product={product} />)

                    ))
                }

            </div>
        </div>
    )
}

export default AllProducts
