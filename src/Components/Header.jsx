import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Dropdown from './helper/dropdown';
import "./header.css"
import LoginModal from './helper/LoginModal';
import "./helper/modal.css"
import { Link } from 'react-router-dom';
/**
* @author
* @function Header
**/

const Header = (props) => {
    const FetchedCategory = useSelector((state) => state.CategoryFectch);
    const [showmodal, setShowmodal] = useState(false)
    const auth = useSelector((state) => state.SignIn)
    const Cart = useSelector(state => state.Cart);
    const CategoryFetch = (categories) => {
        // console.log(categories);
        let CatforLiTag = [];
        for (let category of categories) {
            CatforLiTag.push(
                <li key={category.name}>
                    {category.parentId ? (<Link to={`/${category.slug}`}>{category.name} </Link>) : <span>{category.name}</span>}
                    {category.childrens.length > 0 ? (
                        <ul>
                            {CategoryFetch(category.childrens)}
                        </ul>
                    ) : null}
                </li>
            );
        }
        return CatforLiTag;
    };
    useEffect(() => {
        setShowmodal(false)
    }, [auth.authenticate])
    const logOut = () => {
        console.log("clicked")
        window.localStorage.clear();
        window.location.reload();
    }
    const logoutbutton = () => {
        if (auth.authenticate) {
            return { heading: "Log Out", href: "", btnOnclick: () => logOut() }
        } else return null
    }

    return (
        <>
            <LoginModal
                visibility={showmodal}
                onclose={() => { setShowmodal(false) }}
            />
            < div className="header" >
                <div className="subheader1">
                    <NavLink to="/" className="brand">Shopping Cart</NavLink>
                    <div className="input">
                        <input type="text" placeholder="Search" value="" name="Shop-search" onChange={(e) => e.target.value} /><i className="fas fa-search" style={{ cursor: "pointer" }}></i>
                    </div>
                </div>
                <div className="subheader2">
                    <Dropdown
                        heading={auth.authenticate ? auth.user.firstName : "Login"}
                        mainbtn="mainButton"
                        onclick={() => { if (!auth.authenticate) setShowmodal(true) }}
                        firstLine={auth.authenticate ? null : { text: "Not Registered", action: "Sign Up", href: "/signUp" }}
                        lable={[
                            { heading: "My Profile", href: "", icon: "" },
                            { heading: "Orders", href: "/allOrders", icon: "" },
                            { heading: "Rewards", href: "", icon: "" },
                            logoutbutton()
                        ]} />
                    <Dropdown
                        heading="MORE"
                        lable={[
                            { heading: "Notification Prefrences", href: "" },
                            { heading: "24X7 Customer Care", href: "" },
                            { heading: "We Believe in best Service", href: "" }
                        ]}
                    />
                    <Link to="/cart/product" style={{ color: "white", cursor: "pointer" }}>Cart
                        <span>{Cart.cartProduct !== undefined && Object.keys(Cart.cartProduct).length > 0 ? Object.keys(Cart.cartProduct).length : 0}</span>
                    </Link>
                </div>
            </div >
            <div className="category">
                <ul>
                    {CategoryFetch(FetchedCategory.category)}
                </ul>
            </div>
        </>
    )
}


export default Header