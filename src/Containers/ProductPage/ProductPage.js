import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductMatch } from '../../Actions-Reducers/ProductMatch/ProductMatchAction';
import LayoutHead from '../../Components/Layout';
import { url } from '../../urlConf';
import { Button } from '../../Components/helper/Input';
import "./ProductPage.css";
import { addToCart } from '../../Actions-Reducers/Cart/CartAction';
// import Carousel from "react-responsive-carousel";

/**
* @author
* @function ProductPage
**/

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const ProductDetail = useSelector(state => state.ProductDetail)
    const ProductID = props.match.params.prodsId;
    useEffect(() => {
        dispatch(ProductMatch(ProductID))
        // eslint-disable-next-line
    }, [])
    if (!ProductDetail.fetched) {
        return null;
    }
    // console.log(props)
    return (
        <>
            <LayoutHead>
                <div className="MainContainer">
                    <div className="ProductConatainer">

                        <div className="imageThumb">
                            <div className="imgthumb">
                                {Object.keys(ProductDetail.productDeatails).length > 0 && ProductDetail.productDeatails.productImage.map((image, ind) =>
                                    <img src={`${url}/public/${image.image}`} alt="small thumb" key={ind}></img>
                                )}
                            </div>
                            <div className="mainImageDiv">
                                {ProductDetail.productDeatails.productImage.length > 0 &&
                                    <img src={`${url}/public/${ProductDetail.productDeatails.productImage[0].image}`}
                                        alt="productImage" className="ImgCon"></img>}
                                <div className="btnDiv">
                                    <Button btnName="Add To Cart" bgcolor="rgb(2, 92, 119)" color="white"
                                        shadow="2px 2px 5px rgba(0,0,0,0.3)"
                                        onclick={() => {
                                            const { _id, name, price } = ProductDetail.productDeatails;
                                            const productImage = ProductDetail.productDeatails.productImage[0].image;
                                            const productData = { _id, name, productImage, price }
                                            dispatch(addToCart(productData))
                                            props.history.push("/cart/product")
                                        }} />
                                    <Button btnName="Buy Now" bgcolor="rgb(2, 92, 119)" color="white" shadow="2px 2px 5px rgba(0,0,0,0.3)" />
                                </div>
                            </div>
                        </div>

                        <div className="productDetails">
                            <h5>{ProductDetail.productDeatails.name}</h5>
                            <p><b>Description :  </b>{ProductDetail.productDeatails.description}</p>
                        </div>
                    </div>
                </div>
            </LayoutHead>
        </>
    )
}

export default ProductPage