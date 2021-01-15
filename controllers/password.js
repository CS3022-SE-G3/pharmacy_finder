const bcrypt = require('bcrypt');

async function generatePassword(password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

exports.generatePassword = generatePassword;