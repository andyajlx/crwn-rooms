import { useState } from "react"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import './sign-in-form.style.scss'
import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';

const defaultformFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultformFields)
    const { email, password } = formFields;

    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(response)
            resetFormFields()
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    {
                        alert('Incorrect password for email')
                        break;
                    }
                case 'auth/user-not-found':
                    {
                        alert('Email not Found')
                        break;
                    }
                default:
                    console.log(error)
            }


            console.log('error signing in', error.message)
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

    const SignInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    };




    return (
        <div className="sign-up-form-container">
            <h2>I already have an account?</h2>
            <span>Sign in with your email and passowrd</span>
            <form onSubmit={handleSubmit}>


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

                <div className="buttons-container">
                    <Button type='submit'> Sign In </Button>
                    <Button type='button'buttonType='google'
                        onClick={SignInWithGoogle}>
                        Sign in with Google
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm