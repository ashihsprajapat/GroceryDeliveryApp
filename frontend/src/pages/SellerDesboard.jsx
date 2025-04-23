
import { assets } from './../greencart_assets/assets';
import { NavLink, Outlet } from 'react-router-dom'
import AddProduct from './AddProduct';
import OrderList from './OrderList';
import ProductList from './ProductList';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const SellerDasboard = () => {

    const dashboardicon = (
        <img src={assets.add_icon} />
    );

    const overviewicon = (
        <img src={assets.product_list_icon} />
    );

    const chaticon = (
        <img src={assets.order_icon} />
    );

    const sidebarLinks = [
        { name: "Add Product", path: "/seller/seller", icon: dashboardicon },
        { name: "Product List", path: "/seller/product-list", icon: overviewicon },
        { name: "Orders", path: "/seller/orders", icon: chaticon },
    ];

    const { dashboardCurr, axios, setDashboardCurr, setIsSeller, navigate } = useAppContext();

    const logout = async () => {
        try {

            const { data } = await axios.get("/api/seller/logout");

            if (data.success) {
                toast.success(data.message)
                setIsSeller(false);
                navigate("/")
            }else{
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        navigate("/seller/seller")
    }, [])

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <a href="/">
                    <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
                </a>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={() => logout()} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className='w-full  flex flex-row  '>


                <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 ">
                    {sidebarLinks.map((item, index) => (
                        <NavLink to={item.path} key={index}
                            onClick={() => setDashboardCurr(index)}
                            className={`flex items-center py-3 px-4 gap-3 
                            ${index === dashboardCurr ? "border-r-4 md:border-r-[6px] bg-green-500/10 border-green-500 text-green-500"
                                    : "hover:bg-gray-100/90 border-white text-gray-700"
                                }`
                            }
                        >
                            {item.icon}
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                <div>
                    {<Outlet />}
                </div>
            </div>
        </>
    );
};

export default SellerDasboard;