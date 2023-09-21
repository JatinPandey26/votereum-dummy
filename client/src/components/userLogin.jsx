import { ethers } from 'ethers';
import React, { useState } from 'react';
import {useContractStore} from "../store/contract.js";
import {useUserStore} from "../store/user.js";

function Login() {
    const {contractState,setContractState} = useContractStore(state=>state)
    const {setAuthenticated} = useUserStore(state => state)
    const[aadhaar , setAadhaar] = useState("");
    const[password , setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault();
        const user = await contractState?.userContract?.login(aadhaar, password);
        console.log(user)
        if (user) {
            localStorage.setItem("votereumSigner", JSON.stringify({aadhaarNumber: aadhaar, password: password}));
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }

    return (
        <div>
            <form onSubmit={login}>

                <label htmlFor="name">aadhaar</label>
                <input type="text" name="name" id="name" value={aadhaar} onChange={e => setAadhaar(e.target.value)} />

                <label htmlFor='message'>password</label>
                <input type="password" name='message' id='message' value={password} onChange={e => setPassword(e.target.value)} />

                <button type="submit">Login</button>

            </form>
        </div>
    )
}

export default Login