const bcrypt = require("bcrypt")
const crypto = require('crypto');

const hashPassword = async (password)=>{
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
}

const comparePassword = async (plainPassword, hashedPassword) => {
    // como los usuarios son migrados de php se reemplaza los primeros caracteres del hash
    if (!plainPassword || !hashedPassword) return false;
    
    let fixedHash = hashedPassword; 

    if(hashedPassword.includes("$2y$")){
        fixedHash = hashedPassword.replace(/^\$2y\$/, "$2b$")
        return await bcrypt.compare(plainPassword, fixedHash);
    }

    const hashMD5 = crypto.createHash('md5').update(plainPassword).digest('hex');
    return hashMD5 === hashedPassword;
};

module.exports = {
    hashPassword,
    comparePassword
}