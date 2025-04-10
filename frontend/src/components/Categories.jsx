import React from 'react'
import { categories } from '../greencart_assets/assets'
import CategoryCard from './CategoryCard';

function Categories() {
    return (
        <div className='  gap-2 md:gap-4 lg:gap-6 mt-16  ' >
            <h1 className='text-2xl md:text-3xl font-medium ' >Categories</h1>
            <div className='grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
            md:grid-cols-5  gap-2  mt-6 xl:grid-cols-7  '>


                {
                    categories.map((category, i) => (

                        <CategoryCard key={i} categroy={category} />
                    ))
                }
            </div>
        </div >
    )
}

export default Categories
