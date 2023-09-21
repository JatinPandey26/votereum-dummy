import React, { useState } from 'react';
import {useContractStore} from "../store/contract.js";

function RegistrationForm() {

    const {contractState,setContractState} = useContractStore(state=>state)


    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        password: '',
        houseaddress: '',
        gender: '',
        email: '',
        aadhaarNumber: '',
        imageUrl: '',
        voterConstituency: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {firstname
            ,lastname
            ,age
            ,email
            ,gender
            ,imageUrl
            ,houseaddress
            ,aadhaarNumber
            ,password
            ,voterConstituency} = formData;
        await contractState?.userContract?.signUp(firstname,lastname,age,password,houseaddress,gender,email,aadhaarNumber,imageUrl,voterConstituency);
        localStorage.setItem("votereumSigner",JSON.stringify({aadhaarNumber: aadhaarNumber,password: password}));
        console.log(formData);
    };

    return (
        <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>House Address:</label>
                    <input
                        type="text"
                        name="houseaddress"
                        value={formData.houseaddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Aadhaar Number:</label>
                    <input
                        type="text"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Voter Constituency:</label>
                    <input
                        type="text"
                        name="voterConstituency"
                        value={formData.voterConstituency}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
