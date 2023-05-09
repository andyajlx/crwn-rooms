import { useState } from "react"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import './sign-up-form.style.scss'
import {
    createUserDocumentFromAuth, AuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultformFields)
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields)


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const { user } = await AuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, { displayName })

        } catch (error) {
            console.log('error signing up', error.message)
        }


        console.log('submitted values', event)
        //confirm passwod mathches
        //see if we already have the user in the db
        //create userdocument this
    }



    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })

    };


    return (
        <div className="sign-up-form-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and passowrd</span>
            <form onSubmit={handleSubmit}>

                <label>Display Name</label>
                <FormInput
                    label="display Name"
                    type="text"
                    name="displayName"
                    required
                    onChange={handleChange}
                    value={displayName} />


                <FormInput
                    label="Email"
                    tpye="email"
                    name="email"
                    required
                    onChange={handleChange}
                    value={email} />


                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    value={password} />


                <FormInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    required
                    onChange={handleChange}
                    value={confirmPassword} />

                <Button 
                buttonType={'google'}
                children={"Submit"}
              
                />
            </form>
        </div>
    )
}

export default SignUpForm