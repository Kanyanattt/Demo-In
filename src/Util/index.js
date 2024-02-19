const numberFormat = (number, nullValue) => {
    return number ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : nullValue || "0";
};
export {
    numberFormat,
}