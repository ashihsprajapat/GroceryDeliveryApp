
import React from 'react'
import { assets, features } from '../greencart_assets/assets'

function BottomBanner() {
    return (

        <div className='w-full mt-24 relative  '>
            <img src={assets.bottom_banner_image} className='w-full h-fit py-9 hidden md:block' alt="" />
            <img src={assets.bottom_banner_image_sm} className="w-full md:hidden" />

            <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center
            pt-16 md:pt-0 md:pr-24 ' >
                <div>


                    <h1 className='text-2xl md:text-3xl font-semibold mb-6 text-green-400 mb-5'>Why We Are the Best?</h1>

                    {
                        features.map((featur, i) => (
                            <div key={i} className='flex gap-4 item-center mt-2 ' >
                                <img src={featur.icon} alt={featur.title} className='w-9 md:w-11' />
                                <div className='' >
                                    <h4 className='text-lg md:text-xl font-semibold' >{featur.title}</h4>
                                    <p className='md:text-sm text-xs text-gray-500/70' >{featur.description}</p>
                                </div>
                            </div>
                        ))
                    }



                </div>
            </div>
        </div>
    )
}

export default BottomBanner
