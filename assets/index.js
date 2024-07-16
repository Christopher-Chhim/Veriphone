let apiKey='49F5E158C23E4001B0A886BD3455533E';
let phoneSearch = document.getElementById('phoneSearch');
let phoneNumber = document.getElementById('phoneNumber');
let numberValidation = document.getElementById('numberValidation');


function displayNumber(phoneNumber){
    fetch(`https://api.veriphone.io/v2/verify?phone=%2B${phoneNumber}&key=${apiKey}`)
    .then((res) => {
        return res.json()
    })
   .then((data) =>{
        console.log(data)
   
})
}

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
})

function isValidPhoneNumber(phoneNumber){
    if (!phoneNumber || phoneNumber.length < 12 || phoneNumber.length > 15){
        return false;
    }

    const allowedCharactersPattern = /[^0-9]/g;
    if (!allowedCharactersPattern.test(phoneNumber)){
        return false;
    }

    if (" -'".includes(phoneNumber[0]) || " -'".includes(phoneNumber[phoneNumber.length - 1])){
        return false;
    }

    return true;
}
