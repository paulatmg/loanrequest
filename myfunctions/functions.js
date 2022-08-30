const axios = require('axios').default;
const moment = require('moment');


async function handleAllFunctions({ loanAmount, term }) {
    let continueWhile = true;
    let currentUser = null;
    let counter = 0;

    while (continueWhile) {
        currentUser = await loadUser()
        const isUnderAge = currentUser.dob.age < 28;

        if (isUnderAge === true || counter > 50) {
            continueWhile = false
        }
        counter++
    }

    const isCurrentUserUnderAge = currentUser.dob.age > 28;

    if (isCurrentUserUnderAge === true) {
        return `Name: ${currentUser.name.first}<br></br>Age: ${currentUser.dob.age}<br></br>Gender: ${currentUser.gender}`;
    }

    const requestBody = await createRequestForLoan({ user: currentUser, loanAmount, term });
    const bankResponse = await applyForLoan({ requestBody });

    if (requestBody.loanAmount > 1000 && requestBody.loanAmount < 5000 && requestBody.term > 24 && requestBody.term < 48) {
        return `Your loan of $${bankResponse.json.loanAmount} has been approved. Congrats ${bankResponse.json.firstName}. You have ${bankResponse.json.term} months to pay. Organize yourself and have a good day!!!!`;

    }

    console.log(currentUser);

    return 'Sorry you do not have permission to get a loan!!!';
}


async function loadUser() {
    const randomUserURL = 'https://randomuser.me/api/';
    const entireData = await fetchDataFromAPI({ url: randomUserURL });
    return entireData.results[0];

}


async function fetchDataFromAPI({ url }) {
    const response = await axios.get(url);
    return await response.data;
}


async function createRequestForLoan({ user, loanAmount, term }) {
    return {
        firstName: user.name.first,
        lastName: user.name.last,
        dob: user.dob.age,
        maritalStatus: user.gender === "male" ? "married" : "single",
        gender: user.gender,
        loanAmount: loanAmount,
        term: term,
        postCode: user.location.postcode,
        cellPhone: user.cell,
    }

}

async function applyForLoan({ requestBody }) {
    const response = await axios.post('https://httpbin.org/anything', requestBody);
    return await response.data;

}

module.exports = {
    handleAllFunctions
}