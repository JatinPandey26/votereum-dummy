export function makeUserObject(user){
    if(user.length < 9) return null;
    return {
        firstName: user[0],
        lastName: user[1],
        age: user[2],
        address: user[3],
        gender: user[4],
        email: user[5],
        aadhaarNumber: user[6],
        imageUrl: user[7],
        voterConstituency: user[8]
    };
}