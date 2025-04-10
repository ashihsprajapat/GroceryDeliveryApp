
import React from 'react'
import MainBanner from '../components/mainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import EmailSubscription from '../components/EmailSubscription'


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
