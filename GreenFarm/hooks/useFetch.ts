import { axiosInstance } from "../API/api";

interface ReturnType {
   data:any[],
   error:string,
   success:boolean
}
/**********
* This is the hook that is going to be used to fetch the data
* from the api and return it.
*/
export const useFetch = async (endpoint:string):Promise<ReturnType> =>{
    let responseData:ReturnType = {data:[],error:"",success:false};

    // fetch the data
    try {
    let response = await axiosInstance.get(endpoint);
    if(response.status === 200){
        responseData.success = true;
        responseData.data = response.data.data
    }
        
    } catch (error:any) {
        if(error.response){
           responseData.error = error.response.data.message;
           responseData.success = false
        }
    }

    return responseData
}