function validarPassword (passwordBody, passwordDB) {
    if (passwordBody === passwordDB) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    validarPassword
 
};
