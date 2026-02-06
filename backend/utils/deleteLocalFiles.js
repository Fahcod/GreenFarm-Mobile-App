import fs from "fs";
import { customError } from "./customError.js";

/********************************************************
 * This helper function deletes local files from the server
 * and it takes an array of the files to be deleted
 * @param files_array
 */
export const deleteLocalFiles = (files_array=[])=>{
   if(files_array.length === 0) return;
   //if the files exist, delete them from the local server
   const len = files_array.length;
   for(let i = 0; i < len; i++){
     let filename = files_array[i].split("/")[(len - 1)];
     fs.unlink(`uploads/${filename}`,(err)=>{
        if(err) throw new customError(`Failed to delete files`,500);
        console.log(`uploads/${filename} as deleted successfully`)
     })
   }
}