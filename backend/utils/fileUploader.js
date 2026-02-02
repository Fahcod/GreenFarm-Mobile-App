

/* This function will return an array of uploaded images together with 
their urls to access them, but in development mode */
export const uploadLocaFiles = (files_array=[]) =>{
    let file_urls = [];

    if(files_array.length === 0) return;
    // create the file urls
    for(let i = 0; i < files_array.length; i++){
        file_urls.push(`http://192.168.1.198:7500/api/v1/assets/${files_array[i].filename}`)
    }

    // return the array of the file urls
    return {file_urls}
}