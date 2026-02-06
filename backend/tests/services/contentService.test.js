import * as contentSerivce from "../../services/contentService.js";
import { contentRepository } from "../../repositories/contentRepository.js";
import { uploadLocaFiles } from "../../utils/fileUploader.js";

// mock the 
jest.mock("../../repositories/contentRepository.js");
jest.mock("../../utils/fileUploader.js")

describe("Create content service",()=>{

    // clear mocks before each test
    beforeEach(()=>jest.clearAllMocks());

    it("creates content when the title is new",async ()=>{
        contentRepository.findOne.mockResolvedValue(null);
        uploadLocaFiles.mockReturnValue({file_urls:["http://myapi.com/assets/a.png"]});
        contentRepository.createContent.mockResolvedValue({
            _id:'123',
            title:"Content test 1",
            description:"This is a test",
            files:["http://myapi.com/assets/a.png"]
        });
        const {data} = await contentSerivce.createContentService({
            title:"Content test 1",
            content_type:"article",
            description:"This is a test",
            created_by:"123",
            content_files:[{filename:'a.png'}]
        });

        expect(data._id).toBe("123")
    });

    it("throws an error when the title already exists",async ()=>{
       contentRepository.findOne.mockResolvedValue({title:"Content 1"});
       await expect(contentSerivce.createContentService({
        title:"Content 1",
        content_type:"video"
       })).rejects.toThrow("Content already exists with this title")
       expect(contentRepository.findOne).toHaveBeenCalled();
       expect(contentRepository.findOne).toHaveBeenCalledWith({
        title:"Content 1",content_type:"video"})
    });

})