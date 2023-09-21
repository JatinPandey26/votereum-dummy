// SPDX-License-Identifier: MIT
pragma solidity >0.8.10;

contract Users{

    struct User{
        string firstname;
        string lastname;
        uint256 age;
        string houseaddress;
        string gender;
        string email;
        string aadhaarNumber;
        string imageUrl;
        string voterConstituency;
        address userAddress;
    }


    mapping (string => string) private aadhaarToPassword;

    User[] private users;

    function signUp(
        string memory firstname,
        string memory lastname,
        uint256 age,
        string memory password,
        string memory houseaddress,
        string memory gender,
        string memory email,
        string memory aadhaarNumber,
        string memory imageUrl,
        string memory voterConstituency
    ) public {

        if(checkForValidSignUp(aadhaarNumber)){
            require(false,"Not allowed");
        }

        User memory user = User(firstname,lastname,age,houseaddress,gender,email,aadhaarNumber,imageUrl,voterConstituency,msg.sender);
        users.push(user);
        aadhaarToPassword[aadhaarNumber] = password;
    }

    function checkForValidSignUp(string memory aadhaarNumber) public view returns(bool){
        for(uint i = 0 ; i < users.length ; i++){
            if (keccak256(bytes(users[i].aadhaarNumber)) == keccak256(bytes(aadhaarNumber))) {
                return true; // Found a match
            }
        }

        // more checks in future

        return false;
    }

    function getMap(string memory aadhaarNumber) public view returns (string memory){
        return aadhaarToPassword[aadhaarNumber];
    }

    function login(string memory aadhaarNumber , string memory password) public view returns(User memory) {
        if(keccak256(bytes(aadhaarToPassword[aadhaarNumber])) == keccak256(bytes(password)))
        {
            for (uint i = 0 ; i < users.length; i++){
                if(keccak256(bytes(users[i].aadhaarNumber)) == keccak256(bytes(aadhaarNumber))){

                    return users[i];
                }
            }
        }
        revert("User not found or password is incorrect");
    }

    function getUsers()public view returns (User[] memory){
        return users;
    }

}