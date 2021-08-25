import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Actions-Reducers/SIgnIn/SignInAction'
import { signUpAction } from '../../Actions-Reducers/SignUp/signUpAction'
import { Button, Input } from './Input'

import "./modal.css"

/**
* @author
* @function LoginModal
**/

const LoginModal = (props) => {

    const [signUpmodal, setSignupModal] = useState(false)
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [contact, setcontact] = useState("");
    const signup = useSelector(state => state.SignUp);
    const dispatch = useDispatch();

    const submitLogin = () => {
        const user = {
            email: email.toLowerCase(),
            password
        }
        dispatch(login(user))
    }
    const SignupReq = () => {
        const user = {
            email: email.toLowerCase(),
            password,
            firstName,
            lastName,
            contact
        }
        dispatch(signUpAction(user))
    }
    const signupSucces = () => {
        if (signup.signUpAuthenticate) {
            firstName = "";
            lastName = "";
            email = "";
            password = "";
            contact = "";
            return (
                <span style={{ color: "green", fontWeight: "500", marginBottom: "10px" }}>{signup.user.firstName} account created Succesfully.</span>
            )
        }
    }
    const Enterpress = (e) => {
        if (e.key === 'Enter') {
            submitLogin()
        }
    }

    return (
        <div className={props.visibility ? "modalsize show" : "modalsize"}>
            <div className={props.visibility ? "modalContainer anim" : "modalContainer"}>
                <span style={{ margin: "10px", cursor: "pointer" }} onClick={props.onclose} className="phone">X</span>
                <div className="LoginData">
                    <h3>{signUpmodal ? "Create Your Account" : "Login to Your Account"}</h3>
                    {signUpmodal ?
                        <>
                            <div className="UserLogin">
                                {signupSucces()}
                                <Input
                                    lable="Enter Email"
                                    value={email}
                                    onchange={(e) => { setEmail(e.target.value) }}
                                    type="text" />
                                <Input
                                    lable="Set Password"
                                    value={password}
                                    onchange={(e) => { setPassword(e.target.value) }}
                                    type="password" />
                                <Input
                                    lable="First Name"
                                    value={firstName}
                                    onchange={(e) => { setFirstName(e.target.value) }}
                                    type="text" />
                                <Input
                                    lable="Last Name"
                                    value={lastName}
                                    onchange={(e) => { setLastName(e.target.value) }}
                                    type="text" />
                                <Input
                                    lable="Enter Mobile"
                                    value={contact}
                                    onchange={(e) => { setcontact(e.target.value) }}
                                    type="number" />
                                <Button
                                    btnName="Submit"
                                    bgcolor="Orange"
                                    color="white"
                                    onclick={SignupReq} />
                            </div>
                        </> :
                        <>
                            <div className="UserLogin">
                                <Input
                                    lable="Enter Your Email"
                                    placeholder=""
                                    value={email}
                                    name="email"
                                    onchange={(e) => { setEmail(e.target.value) }}
                                    type="text"
                                />
                                <Input
                                    lable="Enter Your Password"
                                    placeholder=""
                                    value={password}
                                    name="password"
                                    onchange={(e) => { setPassword(e.target.value) }}
                                    onkeypress={(e) => { Enterpress(e) }}
                                    type="password"
                                />
                                <Button
                                    btnName="Login"
                                    color="white"
                                    bgcolor="rgb(2, 92, 119)"
                                    onclick={submitLogin} />

                                <span style={{ margin: "20px 0" }}>OR</span>
                                <Button
                                    btnName="Login with OTP"
                                    color="rgb(2, 92, 119)"
                                    bgcolor="rgba(255, 255, 255)"
                                    shadow="0 2px 4px 0 rgb(0 0 0 / 20%"
                                    onclick={() => { }}
                                />
                            </div>
                        </>}
                    <div className="UserSignUP">
                        <span>{signUpmodal ? "Already Have an account?" : "Look Like You are New Here"}</span>
                        <Button
                            btnName={signUpmodal ? "Login" : "SignUp"}
                            color="white"
                            bgcolor="Orange"
                            onclick={() => {
                                setSignupModal(!signUpmodal)
                            }} />
                    </div>
                </div>
                <div className="LoginHeading">
                    <h2>{signUpmodal ? "SignUp" : "Login"}</h2>
                    <p>{signUpmodal ? "SignUp to Order and Shopping " : "Login to Order and Chart Product"}</p>
                </div>
            </div>
        </div>
    )
}


export default LoginModal