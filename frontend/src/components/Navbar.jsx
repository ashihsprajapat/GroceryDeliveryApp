import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from './../greencart_assets/assets';
import { useAppContext } from '../context/AppContext';

function Navbar() {
    const [open, setOpen] = React.useState(false)

    const { user, setUser, searchQuery, setSearchQuery, navigate, showUserLogin, setShowUserLogin } = useAppContext();

    const logout = async () => {
        setUser(null);
        navigate("/")
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">


            <NavLink to="/" onClick={() => setOpen(false)} >
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/contact">Seller Dashboard</NavLink>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/all-products">All Product</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" onChange={(e)=> setSearchQuery(e.target.value)} />
                    <img src={assets.search_icon} className='w-4 h-4' alt="" />
                </div>

                <div className="relative cursor-pointer" onClick={() => navigate("/cart")} >
                    <img src={assets.cart_icon} className='w-6 opacity-80' alt="" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">3</button>
                </div>
                {!user ? (
                    <button className="cursor-pointer px-8 py-2 bg-green-500   hover:bg-green-400 transition text-white rounded-full"
                        onClick={() => setShowUserLogin(true)}>
                        Login
                    </button>)
                    :
                    <div className="relative group" >
                        <img src={assets.profile_icon} className="w-8" alt="" />
                        <ul className="hidden group-hover:block absolute top-10 right-0  bg-white shadow border border-gray-200 py-2.5 w-40 rounded-md text-sm z-40" >
                            <li className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer" onClick={() => naviget("/my-orders")} >My orders</li>
                            <li className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer" onClick={() => logout()} >Logout</li>
                        </ul>
                    </div>
                }
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} className='w-8' alt="" />
            </button>

            {/* Mobile Menu */}
            {open &&
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink onClick={() => setOpen(false)} to="/" className="block">Home</NavLink>
                    <NavLink onClick={() => setOpen(false)} to="all-product" className="block">All Product</NavLink>

                    {
                        user &&
                        <NavLink onClick={() => setOpen(false)} to="/my-orders" className="block">My orders</NavLink>
                    }

                    <NavLink onClick={() => setOpen(false)} to="/" className="block">Contact</NavLink>
                    {
                        user ?
                            (<button onClick={() => {
                                setOpen(false); logout()
                            }} className="cursor-pointer px-6 py-2 mt-2 bg-green-500 hover:bg-green-400 transition text-white rounded-full text-sm">
                                Logout
                            </button>)
                            :
                            (<button onClick={() => {
                                setOpen(false);
                                setShowUserLogin(true)
                            }} className="cursor-pointer px-6 py-2 mt-2 bg-green-500 hover:bg-green-400 transition text-white rounded-full text-sm">
                                Login
                            </button>)
                    }

                </div>}

        </nav>
    )
}

export default Navbar
