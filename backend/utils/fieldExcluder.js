/**************************************************************
 * This function is used to exclude unwanted fields from an object and it takes in two params,
 * the object to work with and the array of fields to remove
 */
export const excludeFileds = (object,data_array) => {
    let doc = { ...object };
    data_array.forEach(field => delete doc[field]);

    return doc;
}
