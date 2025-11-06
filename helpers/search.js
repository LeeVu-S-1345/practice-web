module.exports = (query) => {
    let keyword = "";

    if (query.keyword) {
        keyword = query.keyword;
    }
    return keyword;
}