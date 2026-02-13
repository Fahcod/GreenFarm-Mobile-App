import * as storeService from "../../services/storeService.js";
import { storeRepository } from "../../repositories/storeRepository.js";

// mock the dependencies
jest.mock("../../repositories/storeRepository.js");
jest.mock("../../utils/fileUploader.js");

describe("Create store service",()=>{

    // clear all mocks beforeEach test
    beforeEach(()=>jest.clearAllMocks());

    it("throws an error when the store name is taken",async ()=>{
        storeRepository.findOne.mockResolvedValue({_id:'123',name:"Test store 1"});

        await expect(storeService.createStoreService({name:"Test store 1"}))
        .rejects.toThrow("This store name is already taken");
        expect(storeRepository.findOne).toHaveBeenCalled();
        expect(storeRepository.findOne).toHaveBeenCalledWith({name:"Test store 1"})
    });

    it("creates a store when the store name is new",async ()=>{
        storeRepository.findOne.mockResolvedValue(null);
        storeRepository.createStore.mockResolvedValue({
            _id:'235',
            name:"Test store 1"
        });

        await expect(storeService.createStoreService({
            name:"Test store 1",
            dealing_in:["Tools"],
            location:{},
            description:"This is a store",
            store_contacts:["07580485440"],
            user_id:"234",
            plan:"premium"
        })).resolves.toEqual(expect.objectContaining({
        data:expect.objectContaining({_id:'235'})}));
        expect(storeRepository.findOne).toHaveBeenCalled();
        expect(storeRepository.findOne).toHaveBeenCalledWith({name:"Test store 1"})
    })
})