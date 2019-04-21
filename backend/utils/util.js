const formatErrors = (errors) => {

    if(errors.length == 0) {
        return {}
    }    
    const formattedErrors = {};
    errors.forEach(error => {
        if(typeof formattedErrors[error.field] === 'undefined') {
            formattedErrors[error.field] = [];
        }
        formattedErrors[error.field].push(error.message);
    })
    return formattedErrors;
}

module.exports = {
    formatErrors
}