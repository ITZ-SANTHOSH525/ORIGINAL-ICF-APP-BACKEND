const { hashPassword } = require('./src/utils/password');

const password = 'YOUR_CHOSEN_PASSWORD';
console.log(hashPassword(password));
