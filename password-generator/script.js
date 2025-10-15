const passwordField = document.getElementById("password");
const generateBtn = document.getElementById("generate");
const upperTick = document.getElementById("upper");
const numberTick = document.getElementById("number");
const symbolTick = document.getElementById("symbol");

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+{}[]";

function generatePassword(length = 10) {
    const allChars = lowercase + uppercase + numbers + symbols;
    let password = "";
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    return password;
}
generateBtn.addEventListener("click", () => {
    const pwd = generatePassword();
    passwordField.value = pwd;
    checkStrength(pwd);
});
