const SeachInList = (list, name) => {
    if (!Array.isArray(list) || !name) {
        return false
    }
    return list.indexOf(name) !== -1
}

module.exports = {
    SeachInList
}