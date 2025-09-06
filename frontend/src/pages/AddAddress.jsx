

import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../greencart_assets/assets'
import { AppContext, useAppContext } from '../context/AppContext'

function AddAddress() {

    const [loading, setLoading] = useState(false);

    const [addressData, setAddressData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangehandle = (e) => {
        setAddressData((address) => ({ ...address, [e.target.name]: e.target.value }))
    }

    const { address,user, setAddress, addAddress, navigate } = useAppContext()

    //add Address
    const checkaddAddress = (e) => {
        e.preventDefault();
        if (!addressData.firstName || !addressData.lastName || !addressData.email || !addressData.street || !addressData.city || !addressData.state || !addressData.zipcode || !addressData.country) {
            toast.error("Please fill all the fields");
            return;
        }
        setLoading(true);
        addAddress(addressData);
        setLoading(false);
        navigate("/cart")
    }

    useEffect(() => {
        if(!user)
            navigate("/cart")
    }, [])


    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Form Section */}
            <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-semiBold mb-6">Add Shippeing <span className='text-green-500'>Address</span></h2>
                <form className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder={address.firstName || "First Name"}
                                onChange={onChangehandle}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                placeholder={address.lastName || "Last Name"}
                                onChange={onChangehandle}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder={address.email || "email"}
                            onChange={onChangehandle}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="street"
                            placeholder={address.street || "street address"}
                            onChange={onChangehandle}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="city"
                                placeholder={address.city || "city"}
                                onChange={onChangehandle}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="state"
                                placeholder={address.state || " state"}
                                onChange={onChangehandle}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="zipcode"
                                placeholder={address.zipcode || " zip code"}
                                onChange={onChangehandle}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="country"
                                placeholder={address.country || "country"}
                                onChange={onChangehandle}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="phone"
                                placeholder={address.phon || " phon No"}
                                onChange={onChangehandle}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                            />
                        </div>
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        onClick={(e) => checkaddAddress(e)}
                    >
                        {
                            loading ?
                                "Saving..."
                                :
                                " Save Address"
                        }

                    </button>
                </form>
            </div>

            {/* Image Section */}
            <div className="hidden md:block md:w-1/2 relative">
                <img
                    src={assets.add_address_iamge}
                    alt="Address illustration"
                    className="absolute inset-0 w-full h-full object-contain p-8"
                />
            </div>
        </div>
    )
}

export default AddAddress
