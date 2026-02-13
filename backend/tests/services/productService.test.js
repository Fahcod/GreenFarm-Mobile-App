import * as productService from "../../services/productService.js";
import { productRepository } from "../../repositories/productRepository.js";
import { uploadLocaFiles } from "../../utils/fileUploader.js";
import { storeRepository } from "../../repositories/storeRepository.js";

// mock all the dependencies
jest.mock("../../repositories/productRepository.js");
jest.mock("../../utils/fileUploader.js");
jest.mock("../../repositories/storeRepository.js");

describe("Create product service",()=>{
    beforeEach(()=>jest.clearAllMocks());
    
    it("throws an error when product name already exists",async ()=>{
        productRepository.findOne.mockResolvedValue({title:"Test product 1"});

        await expect(productService.createProductService({
            title:"Test product 1"
        })).rejects.toThrow("Product with this name already exists");
        expect(productRepository.findOne).toHaveBeenCalled();
        expect(productRepository.findOne).toHaveBeenCalledWith({title:"Test product 1"})
    });

    it("throws an error when the store does not exist",async ()=>{
        productRepository.findOne.mockResolvedValue(null);
        storeRepository.findById.mockResolvedValue(null);

        await expect(productService.createProductService({
            title:"New test product 1",
            storeId:"123"
        })).rejects.toThrow("Store does not exist");
        expect(productRepository.findOne).toHaveBeenCalled();
        expect(storeRepository.findById).toHaveBeenCalled();
        expect(storeRepository.findById).toHaveBeenCalledWith("123")
    });

    it("throws an error when the user does'nt own the store",async ()=>{
        productRepository.findOne.mockResolvedValue(null);
        storeRepository.findById.mockResolvedValue({owner:{_id:565}});

        await expect(productService.createProductService({
            title:"New test product 1",
            storeId:"123",
            user_id:'352'
        })).rejects.toThrow("This store is not yours");
        expect(productRepository.findOne).toHaveBeenCalled();
        expect(storeRepository.findById).toHaveBeenCalled();
        expect(storeRepository.findById).toHaveBeenCalledWith("123")
    });

    it("throws an error when the files array is empty",async ()=>{
        productRepository.findOne.mockResolvedValue(null);
        storeRepository.findById.mockResolvedValue({owner:{_id:565}})
        
        await expect(productService.createProductService({
            title:"New test product 1",
            storeId:"123",
            user_id:'565',
            product_files:[]
        })).rejects.toThrow("Product images were not found");
        expect(productRepository.findOne).toHaveBeenCalled();
        expect(storeRepository.findById).toHaveBeenCalled();
        expect(storeRepository.findById).toHaveBeenCalledWith("123")
    });

    it("creates a new product when everything else is okay",async ()=>{
        productRepository.findOne.mockResolvedValue(null);
        storeRepository.findById.mockResolvedValue({owner:{_id:565}});
        uploadLocaFiles.mockReturnValue({file_urls:["http://myapi.com/assets/p.jpg"]})
        productRepository.createProduct.mockResolvedValue({
            _id:'564',
            title:"Test product 1",
            price:45000,
            images:["http://myapi.com/assets/p.jpg"]
        });
        
        const {data} = await productService.createProductService({
            title:"Test product 1",
            description:"This is a test product",
            price:35000,
            category:"Tools",
            quantity:3,
            storeId:"123",
            user_id:"565",
            product_files:[{filename:'p.png'}]
        });
        expect(data._id).toBe("564");
        expect(productRepository.findOne).toHaveBeenCalled();
        expect(storeRepository.findById).toHaveBeenCalled();
        expect(storeRepository.findById).toHaveBeenCalledWith("123")
    })
});

