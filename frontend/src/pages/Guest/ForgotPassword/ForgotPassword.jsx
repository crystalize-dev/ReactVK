import React, {useState} from 'react';
import axios from "../../../axios/axios"

import cl from "./ForgotPassword.module.css";

import classes from "classnames";
import InputLogin from "../../../components/GuestPage/InputLogin/InputLogin";
import WindowForm from "../../../components/GuestPage/windowForm/windowForm";
import ButtonBlack from "../../../components/GuestPage/buttonBlackSubmit/ButtonBlack";
import {emailErrorHandler} from "../../../utils/validation/emailErrorHandler";
import {catchErrorsHandler} from "../../../utils/cathErrorHandler";
import Loading from "../../../components/UI/loading/loading";


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState("")
    const [fetch, setFetch] = useState(false)

    const sendReq = async (e) => {

        e.preventDefault();

        if (emailErrorHandler(email, setError)) return

        setFetch(true)
        try {
            await axios.post(
                '/forgotEmail',
                {email: email})

                .then(() => {
                    setEmail('')
                    setError("Done!")
                })
        } catch (err) {
            catchErrorsHandler(err, setError)
        }
        setFetch(false)
    }

    return (
        <>
            <Loading status={fetch}/>
            <WindowForm onSubmit={(e) => sendReq(e)} backArrow={true}>
                <div className={cl.textArea}>
                    <h2>Forgot password?</h2>
                    <h4>Enter your email to reset it</h4>
                </div>

                <InputLogin type="email" placeholder="Enter Email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            autoComplete={"on"}
                            icon={"mail"}
                            className={error === "Done!" ? classes(cl.expandedInput, cl.doneMarker) : cl.expandedInput}
                            error={error}/>

                <ButtonBlack>Send reset link</ButtonBlack>
            </WindowForm>
        </>
    );
};

export default ForgotPassword;