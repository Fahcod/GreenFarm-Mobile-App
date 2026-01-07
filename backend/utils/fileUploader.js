

// this function is to be used to save a file
const uploadSaveFile = function(FILE_PATH){
try {
    
// create the file_url
const file_url = `http://localhost:7500/api/v1/assets/${FILE_PATH}`;
return file_url

} catch (error) {
    console.log(error)
    throw Error(error)
}
}

export {uploadSaveFile}