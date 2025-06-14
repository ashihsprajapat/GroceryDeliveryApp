
import React from 'react'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import EmailSubscription from '../components/EmailSubscription'
import MainBanner from '../components/MainBanner'


function HomePage() {
    return (
        <div className='mt-10' >

            <MainBanner />
            <Categories/>
            <BestSeller/>
            <BottomBanner/>
            <EmailSubscription />
        </div>
    )
}

export default HomePage
