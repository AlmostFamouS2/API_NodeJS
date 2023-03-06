const sanitize = (message) => {
    return message.replace(/[^a-zA-Z0-9\s]/g, '');    //  Removing all that's not secure from the response
}
