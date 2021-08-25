import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loaderOff } from '../../Actions-Reducers/LoaderAction'
import { deleteSelectedAddress, order, userAddress } from '../../Actions-Reducers/userAddress/userAddressAction'
import { Button, Input } from '../../Components/helper/Input'
import LoginModal from '../../Components/helper/LoginModal'
import LayoutHead from '../../Components/Layout'
import PriceCart from '../../Components/PriceCart'
import Cart from '../Cart/Cart'
import "./OrderPlace.css"

/**
* @author
* @function OrderPlacePage
**/

const OrderPlacePage = (props) => {
    const CartState = useSelector(state => state.Cart);
    const userAddressState = useSelector(state => state.UserAddress)
    const [showmodal, setShowmodal] = useState(false)
    const auth = useSelector((state) => state.SignIn)
    const [name, setName] = useState("");
    const [contact, setNumber] = useState("");
    const [pincode, setPincode] = useState("");
    const [HouseNo, setHouseNo] = useState("");
    const [fullAddress, setFulladdress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [addressType, setAddressType] = useState("");
    const [newAddress, setNewAddress] = useState(false);
    const [EditEnable, setEditEnable] = useState("");
    const [Error, setError] = useState(false);
    const [secondStep, setsecondStep] = useState(false);
    const [thirdStep, setthirdStep] = useState(false);
    const [checked, setChecked] = useState("");
    const [SelectedAddressId, setSelectedAddressId] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        setShowmodal(false)
    }, [auth.authenticate])
    let GlobleAddress = { name, contact, pincode, HouseNo, fullAddress, city, state, addressType }
    const clearState = () => {
        setName("");
        setNumber("");
        setPincode("");
        setHouseNo("");
        setFulladdress("");
        setState("");
        setCity("");
        setError(false)
    }
    const selectedAdress = async (id) => {
        const getData = await userAddressState.Address.filter((data) => {
            return data._id === id
        })
        let { name, contact, pincode, HouseNo, fullAddress, city, state, addressType } = getData[0];
        setSelectedAddressId(id)
        setName(name);
        setNumber(contact);
        setPincode(pincode);
        setHouseNo(HouseNo);
        setFulladdress(fullAddress);
        setState(state);
        setCity(city);
        setAddressType(addressType);
    }
    const submitAddress = async (type, _id = null) => {
        const checkresult = await checkvalue();
        if (checkresult) {
            const Address = GlobleAddress;
            Address.actionType = type
            if (_id) {
                Address._id = _id
            }
            dispatch(userAddress(Address));
            clearState()
            setNewAddress(false)
        } else {
            setError(true)
        }

    }
    const deleteAddress = (_id) => {
        if (window.confirm("Are you Sure to Delete Address.")) {
            const deleteAdd = {
                _id,
                actionType: "delete"
            }
            dispatch(deleteSelectedAddress(deleteAdd))
        }

    }
    const FormForAddress = (type, _id) => {
        return (
            <div>
                {Error && <span style={{
                    color: "white",
                    backgroundColor: "red", padding: "5px", borderRadius: "5px"
                }}>Fill Properly And Check Address Type Also.</span>}
                <div className="inputfield">
                    <Input
                        type="text"
                        lable="Name"
                        name="name"
                        lableFor="name"
                        value={name}
                        onchange={(e) => { setName(e.target.value) }}
                    />
                    <Input
                        type="number"
                        lable="Number"
                        name="number"
                        value={contact}
                        onchange={(e) => { setNumber(e.target.value) }}
                    />
                    <Input
                        type="number"
                        lable="Pincode"
                        name="pincode"
                        value={pincode}
                        onchange={(e) => { setPincode(e.target.value) }}
                    />
                    <Input
                        type="text"
                        lable="House No"
                        name="House No"
                        value={HouseNo}
                        onchange={(e) => { setHouseNo(e.target.value) }}
                    />
                    <Input
                        type="text"
                        lable="City"
                        name="City"
                        value={city}
                        onchange={(e) => { setCity(e.target.value) }}
                    />
                    <Input
                        type="text"
                        lable="State"
                        name="State"
                        value={state}
                        onchange={(e) => { setState(e.target.value) }}
                    />
                </div>
                <Input
                    type="text"
                    lable="Other Address"
                    name="Address"
                    value={fullAddress}
                    style={{ "maxWidth": "100%" }}
                    onchange={(e) => { setFulladdress(e.target.value) }} />
                <div className="addressType" onChange={(e) => { setAddressType(e.target.value) }}>
                    <div style={{ fontWeight: "500" }}>Address Type*</div>
                    Home
                    <input type="radio" name="type" value="Home" />
                    Office
                    <input type="radio" name="type" value="Office" />
                    Other
                    <input type="radio" name="type" value="Other" />
                </div>
                <Button
                    btnName="Submit"
                    color="white"
                    width="150px"
                    onclick={() => { submitAddress(type, _id) }} />
            </div>
        )
    }
    const funcForEdit = (id) => {
        setEditEnable(id);
        setNewAddress(false);
        setError(false)
        selectedAdress(id)
    }
    const checkvalue = () => {
        if (name.length > 0 && pincode.toString().length > 0 && contact.toString().length === 10
            && city.length > 0 && state.length > 0 && HouseNo.length > 0 && fullAddress.length > 0 && addressType.length > 0) {
            return true
        } else {
            return false;
        }
    }
    const fullAddressFordeliver = () => {
        return `${GlobleAddress.name},${GlobleAddress.HouseNo} ${GlobleAddress.fullAddress} ${GlobleAddress.city} ${GlobleAddress.state} ${GlobleAddress.pincode}`
    }
    const stepDoneTick = () => {
        return (
            <div>
                <span className="theme"> Step done ✔</span>
            </div>
        )
    }
    const SubmitOrder = async () => {
        const products = CartState.cartProduct;
        const orderDetails = await {
            products: Object.keys(products).length > 0 && Object.keys(CartState.cartProduct).map((data) => {
                return { productId: data, quantity: products[data].quantity, buyPrice: products[data].price }
            }),
            deliveryAddressId: SelectedAddressId,
            deliveryAddress: await fullAddressFordeliver(),
            paymentMode: "Cash on delivery",
            PaymentStatus: "Pending",
            orderStatus: "Ordered"
        }
        dispatch(order(orderDetails));
        props.history.push("/order/confirmed");
    }
    useEffect(() => {
        dispatch(loaderOff())
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <LoginModal
                visibility={showmodal}
                onclose={() => { setShowmodal(false) }}
            />
            <LayoutHead>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="CartContainer">
                        <div style={{ width: "60%" }}>
                            {/* First Step Login Check */}
                            <div className="CartData" style={{ padding: "10px" }}>
                                <h4 className={auth.authenticate ? "normal" : "heading"}>LOGIN</h4>
                                {auth.authenticate ?
                                    <>
                                        <p>You Are Logged in.</p>
                                        <span>Your Email Address is <b>{auth.user.email}</b></span>
                                        {stepDoneTick()}

                                    </> :
                                    <>
                                        <p>Please Login First</p>
                                        <Button
                                            btnName="Login"
                                            onclick={() => { if (!auth.authenticate) setShowmodal(true) }}
                                            width="200px"
                                            color="white"
                                        />
                                    </>}
                            </div>
                            {/* Second Step Deliver Address */}
                            <div className="CartData">
                                <h4 className={!thirdStep && !secondStep && auth.authenticate ? "heading" : "normal"}>ADDRESS</h4>
                                {!thirdStep && !secondStep ?
                                    <>
                                        {auth.authenticate &&
                                            userAddressState.Address.length > 0 &&
                                            userAddressState.Address.map((stateAddress, ind) =>
                                                stateAddress._id !== EditEnable ?
                                                    <div key={ind} className="SavedAddress">
                                                        <div style={{ margin: "20px" }} className="SavedAddress1">
                                                            <input type="radio" name="address" style={{ marginRight: "20px" }}
                                                                onChange={() => { setChecked(ind); selectedAdress(stateAddress._id) }} />
                                                            <div>
                                                                <h5>Name : {stateAddress.name}, </h5>
                                                                <p>Address : {`${stateAddress.HouseNo}, ${stateAddress.fullAddress}, ${stateAddress.city}, ${stateAddress.state}`}</p>
                                                                <p>Contact: {stateAddress.contact}</p>
                                                                {checked === ind &&
                                                                    <Button btnName="Deliver Here" width="200px" color="white"
                                                                        onclick={() => { setsecondStep(true) }} />}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <i className="fas fa-trash-alt icon" onClick={() => { deleteAddress(stateAddress._id) }}></i>
                                                            <i className="fas fa-edit icon" onClick={() => { funcForEdit(stateAddress._id) }}></i>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div key={ind}>
                                                        <span style={{
                                                            color: "#fff",
                                                            cursor: "pointer",
                                                            fontWeight: "500",
                                                            backgroundColor: "hsl(194, 94%, 25%)",
                                                            padding: "5px",
                                                            borderRadius: "5px"
                                                        }} onClick={() => {
                                                            setEditEnable(false);
                                                            clearState();
                                                        }}>Cancel Edit</span>
                                                        {FormForAddress("Edit", stateAddress._id)}
                                                    </div>
                                            )
                                        }
                                        {auth.authenticate &&
                                            <div style={{ margin: "20px" }}>
                                                <span style={{ color: "hsl(194, 94%, 25%)", cursor: "pointer" }}
                                                    onClick={(e) => { setEditEnable(false); setNewAddress(!newAddress) }}>
                                                    {newAddress
                                                        ? <b>-Hide New Address </b> : <b>+Add New Address </b>}</span>
                                            </div>
                                        }
                                        {newAddress && FormForAddress("Add")}
                                    </>
                                    :
                                    <div> Delivered to : <b>{fullAddressFordeliver()}</b></div>
                                }
                                {secondStep &&
                                    stepDoneTick()
                                }
                                {thirdStep &&
                                    stepDoneTick()
                                }
                            </div>
                            {/* Third Step Summary */}
                            <div className="CartData" >
                                <div>
                                    <h4 className={secondStep ? "heading" : "normal"}>Summary</h4>
                                    {secondStep &&
                                        <>
                                            <Cart
                                                orderSummary={true} />
                                            <div className="btn-con">
                                                <Button
                                                    btnName="Continue"
                                                    width="300px"
                                                    color="white"
                                                    onclick={() => { setthirdStep(true); setsecondStep(false) }}
                                                />
                                            </div>
                                        </>
                                    }
                                    {thirdStep &&
                                        <>
                                            <div>{`${Object.keys(CartState.cartProduct).length} Items`} </div>
                                            {stepDoneTick()}
                                        </>
                                    }

                                </div>
                            </div>
                            <div className="CartData">
                                <div>
                                    <h4>Payment Method</h4>
                                    {thirdStep &&
                                        <>
                                            <input type="radio" name="PaymentMethod" value="Cash" />
                                            <label style={{ marginLeft: "10px" }}>Cash On Delivery </label>
                                            <div className="btn-con">
                                                <Button
                                                    btnName="Confirm Order"
                                                    color="white"
                                                    width="200px"
                                                    onclick={() => { SubmitOrder() }}
                                                />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <PriceCart />
                    </div>

                </div>

            </LayoutHead>
        </>
    )

}

export default OrderPlacePage