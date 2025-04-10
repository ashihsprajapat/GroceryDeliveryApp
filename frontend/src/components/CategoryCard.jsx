import React from 'react'
import { useAppContext } from './../context/AppContext';

function CategoryCard({ categroy }) {
    const { navigate } = useAppContext();
    return (
        <div className={` cursor-pointer m-2 group py-5 px-3 justify-center items-center gap-2
        rounded-lg flex flex-col `} style={{ background: `${categroy.bgColor}` }}
            onClick={() => {
                navigate(`/products/${categroy.path.toLowerCase()}`); scrollTo(0, 0)
            }}
        >
            <img src={categroy.image} alt="" className='max-w-28  group-hover:scale-110 transition' />
            <p className='text-sm  font-medium' >{
                categroy.text
            }</p>
        </div >
    )
}

export default CategoryCard
