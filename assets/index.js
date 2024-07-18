let apiKey='49F5E158C23E4001B0A886BD3455533E';
let phoneSearch = document.getElementById('phoneSearch');
let phoneNumber = document.getElementById('phoneNumber');
let numberValidation = document.getElementById('numberValidation');

let valid = document.getElementById('valid');
let country = document.getElementById('country');
let localNumber = document.getElementById('localNumber');
let region = document.getElementById('region');
let dialCode = document.getElementById('dialCode');



function displayNumber(phoneNumber){
    fetch(`https://api.veriphone.io/v2/verify?phone=%2B${phoneNumber}&key=${apiKey}`)
    .then((res) => {
        return res.json()
    })
   .then((data) =>{
        console.log(data);
        console.log(data.phone_valid);
        console.log(data.country);
        console.log(data.local_number);
        console.log(data.phone_region);
        console.log(data.country_prefix);

        let pTag = document.createElement('p')
        valid.innerHTML = "<strong> Valid: </strong>" + data.phone_valid;
        country.innerHTML = "<strong> Country: </strong>" + data.country;
        localNumber.innerHTML = "<strong> Local Number: </strong>" + data.local_number;
        region.innerHTML = "<strong> Region: </strong>" + data.phone_region;
        dialCode.innerHTML = "<strong> Dial Code: </strong>" + data.country_prefix;
    });
};

function retrieveNumber(){
    let phoneHistory = JSON.parse(localStorage.getItem("phone")) || [];
    return phoneHistory;
}

function saveNumber(phoneHistory){
    localStorage.setItem("phone", JSON.stringify(phoneHistory));
    return;
}

phoneSearch.addEventListener(`click`, function(event)
{
    event.preventDefault();
    let phoneNumber = document.getElementById(`phoneNumber`).value;
    if (!isValidPhoneNumber(phoneNumber)){
        window.alert("Please enter a valid phone number")
        return;
    }
    displayNumber(phoneNumber);
    let phoneArray = retrieveNumber();
    phoneArray.push(phoneNumber);
    saveNumber(phoneArray);
})

function isValidPhoneNumber(phoneNumber){
    if (!phoneNumber || phoneNumber.length < 11 || phoneNumber.length > 15){
        console.log("Too short")
        return false;
    }

    const allowedCharactersPattern = /[0-9]/g;
    if (!allowedCharactersPattern.test(phoneNumber)){
        console.log(phoneNumber)
        console.log("Must contain numbers only")
        return false;
    }

    if (" -'".includes(phoneNumber[0]) || " -'".includes(phoneNumber[phoneNumber.length - 1])){
        console.log("Must not be blank")
        return false;
    }

    return true;
}
