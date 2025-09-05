
import { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { dummyAddress } from "../greencart_assets/assets";
import toast from "react-hot-toast";

const Cart = () => {

    const { products, currency, navigate, cartItems, setCartItems, removeFromCart,
        updateCartItem, navigatae, user,
        axios,
        loadingAddress, setLoadingAddress
    } = useAppContext();


    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0])
    const [paymentOption, setPaymentOption] = useState("COD");



    const [paymentType, setPaymentType] = useState("COD")
    const [isPaid, setIsPaid] = useState(false);
    const [amount, setAmount] = useState(0);
    const [accualAmount, setAccualAmount] = useState(0);

    // const product = [
    //     { name: "Running Shoes", description: ["Lightweight and comfortable", "Breathable mesh upper", "Ideal for jogging and casual wear"], offerPrice: 250, price: 200, quantity: 1, size: 42, image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png", category: "Footwear", },
    //     { name: "Running Shoes", description: ["Lightweight and comfortable", "Breathable mesh upper", "Ideal for jogging and casual wear"], offerPrice: 250, price: 200, quantity: 1, size: 42, image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png", category: "Footwear", },
    //     { name: "Running Shoes", description: ["Lightweight and comfortable", "Breathable mesh upper", "Ideal for jogging and casual wear"], offerPrice: 250, price: 200, quantity: 1, size: 42, image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png", category: "Footwear", },
    // ]


    useEffect(() => {
        const getUserAddress = async () => {
            try {
                setLoadingAddress(true)
                const { data } = await axios.get("/api/address/get-address")
                //  console.log("data of address of user", data)
                if (data.success) {
                    setAddresses(data.address)
                    if (data.address.length > 1) {
                        setSelectedAddress(data.address[0])
                    }
                }
                setLoadingAddress(false)
            } catch (err) {
                console.log(err.message)
            }
        }
        if (user) {
            //get the user address
            getUserAddress()
        }
    }, [user])


    const getCart = () => {
        // console.log("trigger to getCart")
        let tempArray = [];
        for (const key of products) {
            //  const matchedProduct = product.find((items, i) => items._id === key._id)
            // if (!matchedProduct) continue;

            // console.log("product are ", product)
            // matchedProduct.quantity = cartItems[key];
            // tempArray.push(matchedProduct);

            if (!Object.prototype.hasOwnProperty.call(cartItems, key._id))
                continue;
            tempArray.push(key);
        }
        setCartArray(tempArray);
        // console.log("temp array is", tempArray);
    }


    const getCartCount = () => { return 8 }

    const removeItmeFromCart = (productId) => {
        console.log("remove from cart trigger")
        let cartDate = structuredClone(cartItems)

        delete cartDate[productId]
        setCartItems(cartDate);
    }

    //calculate total amount and 
    const calculateAmount = () => {
        let totalAmount = 0;
        let toatlaccual = 0;
        cartArray.forEach((product) => {
            toatlaccual += product.price * cartItems[product._id]
            return totalAmount += product.offerPrice * cartItems[product._id]

        })
        setAmount(totalAmount);
        setAccualAmount(toatlaccual)
    }

    console.log("payment type is ", paymentType)

    //order place on cod
    //add orders post request
    const orderPlace = async (order) => {
        try {

            if (paymentType === 'COD') {
                console.log("order place with cod")
                const { data } = await axios.post("/api/order/COD", {
                    userId: user._id,
                    amount,
                    address: selectedAddress._id,
                    paymentType,
                    items: cartArray.map((item) => (
                        {
                            product: item._id,
                            quantity: cartItems[item._id],
                        }
                    ))
                })
                console.log("response of order placeing ", data)
                if (data.success) {
                    toast.success(data.message)
                    setCartItems({})
                    navigate("/my-orders")
                } else {
                    toast.error(data.message)
                }
            } else {
                console.log("order place with stripe")
                const { data } = await axios.post("/api/order/stripe", {
                    userId: user._id,
                    address: selectedAddress._id,
                    paymentType,
                    items: cartArray.map((item) => (
                        {
                            product: item._id,
                            quantity: cartItems[item._id],
                        }
                    ))
                })

                console.log("data of order by stripe", data)

                if (data.success) {
                    window.location.replace(data.url)
                } else {
                    toast.error(data.message)
                }
            }


        } catch (err) {
            console.log(err)
        }
    }







    useEffect(() => {
        calculateAmount()
    }, [setCartArray, cartItems, setCartItems, removeItmeFromCart])


    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems])


    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{getCartCount()}</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3 *:">
                            <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                                onClick={() => {
                                    navigate(`/${product.category.toLowerCase()}/${product._id}`);
                                    scrollTo(0, 0)
                                }}

                            >

                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{products.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select className='outline-none'
                                            value={cartItems[product._id]}
                                            onChange={(e) => setCartItems({ ...cartItems, [product._id]: e.target.value })}
                                        >
                                            {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.offerPrice * cartItems[product._id]}</p>
                        <button className="cursor-pointer mx-auto"
                            onClick={() => removeItmeFromCart(product._id)}>

                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}

                <button className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        {
                            loadingAddress ? (
                                <div className="flex items-center justify-center w-full h-24 bg-gray-50 rounded-md border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-gray-600">Loading address details...</p>
                                    </div>
                                </div>
                            ) :

                                (
                                    <div className="flex flex-col">
                                        <div className="flex flex-col space-y-2 text-sm md:text-base">

                                            <div className="flex gap-2 flex-wrap">
                                                <span>{selectedAddress.street},</span>
                                                <span>{selectedAddress.city},</span>
                                                <span>{selectedAddress.state},</span>
                                                <span>{selectedAddress.country},</span>
                                                <span>{selectedAddress.zipcode}</span>
                                            </div>
                                        </div>



                                        <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                                            Change
                                        </button>
                                        {showAddress && (
                                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                                <p onClick={() => setShowAddress(false)} className="text-gray-500 p-2 hover:bg-gray-100">
                                                    {addresses.length > 0 ? (
                                                        <>

                                                            {
                                                                addresses.map((address, i) => (
                                                                    <div className="flex flex-col space-y-2 text-sm md:text-base cursor-pointer hove:bg-gray-900"
                                                                        onClick={() => setSelectedAddress(address)}>

                                                                        <div className="flex gap-2 flex-wrap">
                                                                            <span>{address.street},</span>
                                                                            <span>{address.city},</span>
                                                                            <span>{address.state},</span>
                                                                            <span>{address.country},</span>
                                                                            <span>{address.zipcode}</span>
                                                                        </div>
                                                                        <hr />
                                                                    </div>
                                                                ))}
                                                        </>

                                                    ) : "New York, USA"}
                                                </p>
                                                <p onClick={() => {
                                                    setShowAddress(false)
                                                    navigate("/add-address")
                                                }} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                                    Add address
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )
                        }

                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}>
                        <option value={"COD"} >Cash On Delivery</option>
                        <option value={"Online"} >Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>${accualAmount}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>$20</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>${amount}</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
                    onClick={orderPlace}>
                    Place Order
                </button>
            </div>
        </div>

    )
        :
        null
}


export default Cart;