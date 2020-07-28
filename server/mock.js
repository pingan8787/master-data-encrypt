const userData = [
    {name: "Leo",    age: 18, address: "QuanZhou"},
    {name: "Robin",  age: 19, address: "Netherlands"},
    {name: "Rooney", age: 22, address: "England"},
];

const getUser = name => name ? userData.filter(item => item.name === name) : userData;

module.exports = {
    getUser
};