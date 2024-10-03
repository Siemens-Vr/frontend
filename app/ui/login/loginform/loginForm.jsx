"use client";

import { useState } from "react";
import { authenticate } from "/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const LoginForm = () => {
    const [state, formAction] = useFormState(authenticate, undefined);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form action={formAction} className={styles.form} onSubmit={() => setLoading(true)}>
            <h1>Login</h1>

            <input type="text" placeholder="username" name="username" required />


            <div className={styles.passwordWrapper}>
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    required
                />
                <span onClick={togglePasswordVisibility} className={styles.eyeIcon}>
                    {passwordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
                </span>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            {state && state}
        </form>
    );
};

export default LoginForm;
