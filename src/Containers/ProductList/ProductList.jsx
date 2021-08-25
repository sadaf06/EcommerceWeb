import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductList } from '../../Actions-Reducers/Products/ProductAction';
import Layout from '../../Components/Layout'
import { url } from "../../urlConf"
import "./Product.css"
import { Link } from "react-router-dom"
/**
* @author
* @function ProductListByslug
**/

const ProductListByslug = (props) => {
    const ProductState = useSelector((state) => state.ProductFetch)
    const dispatch = useDispatch();
    const slug = props.match.params.slug
    useEffect(() => {
        dispatch(ProductList(slug))
        // eslint-disable-next-line
    }, [slug])

    const ProductDisplay = (Products) => {
        return (
            <>
                <h3 style={{ margin: "20px", letterSpacing: "1px" }}>{slug}</h3>
                {Object.keys(Products.ProductByPrice).map((key, ind) => {
                    if (Products.ProductByPrice[key].length > 0) {
                        return (
                            <div className="cart" key={ind}>
                                <div className="cartheading">
                                    <h2>{slug} {key}</h2>
                                    <button>View All</button>
                                </div>
                                <div className="ProductRow">
                                    {Products.ProductByPrice[key].map((prods, ind) => {
                                        return (
                                            <Link to={`/${prods.slug}/${prods._id}/productPage`} className="productDisc" key={ind}>
                                                <figure className="imgContainer">
                                                    {prods.productImage.length > 0 && <img src={`${url}/public/${prods.productImage[0].image}`} alt="Product" />}
                                                </figure>
                                                <p className="lable">{prods.name}</p>
                                                <div>
                                                    <span>4.2</span> <span>(501)</span>
                                                </div>
                                                <h4>{prods.price}</h4>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
            </>
        )
    }
    return (

        <>
            <Layout>
                {ProductDisplay(ProductState)}
            </Layout>
        </>
    )

}

export default ProductListByslug