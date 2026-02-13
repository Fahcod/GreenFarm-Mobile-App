import * as authService from "../../services/authService.js";
import { authRepository } from "../../repositories/authRepository.js";
import { createAccessToken,createRefreshToken } from "../../utils/tokenUtils.js";
import bcrypt from "bcryptjs";

// first mock the auth repository
jest.mock("../../repositories/authRepository.js");
jest.mock("../../utils/tokenUtils.js");
jest.mock("bcryptjs")

describe ("Register user service",()=>{

    // clear all mocks before each test
    beforeEach(()=>{jest.clearAllMocks()});

    it("throws an error when email already exists",async ()=>{
          authRepository.findByEmail.mockResolvedValue({
          _id:'b876fgh876f87',email:'test@gmail.com',name:"Fahad",role:"tester"});
          createAccessToken.mockReturnValue("kjhgfgyuioiuyt");
          createRefreshToken.mockReturnValue("kjhgfgyuioiuyt");

         await expect(authService.registerUserService({
            email:'test@gmail.com',
            name:"Fahad",
            role:"tester",
            password:"coder"})).rejects.toThrow("This email is already taken")
    });

    it("creates a user when email does not extist",async ()=>{
        authRepository.findByEmail.mockResolvedValue(null);
        authRepository.createUser.mockResolvedValue({
            _id:"1234",
            name:"Fahad",
            email:"test@gmail.com"
        })
        const result = await authService.registerUserService({
            email:'test@gmail.com',
            name:"Fahad",
            role:"tester",
            password:"coder"
        });

        expect(authRepository.findByEmail).toHaveBeenCalledWith("test@gmail.com");
        expect(authRepository.createUser).toHaveBeenCalled();
        expect(result.data._id).toBe("1234")
    });
});

describe("Login user service",()=>{

    // clear all mocks
    beforeEach(()=>{jest.resetAllMocks()});

    it("throws an error when user does not exist",async ()=>{
        createAccessToken.mockReturnValue("kjhgfgyuioiuyt");
        createRefreshToken.mockReturnValue("kjhgfgyuioiuyt");

        authRepository.findByEmail.mockResolvedValue(null);
       
        await expect(authService.loginUserService({
            email:'test@gmail.com',
            password:'tester415'
        })).rejects.toThrow("User does not exist")

    });

    it("throws an error when passwords don't match",async ()=>{
         bcrypt.compare.mockResolvedValue(false);
         authRepository.findByEmail.mockResolvedValue({
            email:'test@gmail.com',
            password:'tester415'
        });

        await expect(authService.loginUserService({
            email:'test@gmail.com',
            password:'tester41587'
        })).rejects.toThrow("Wrong password")
    });

    it("logs in the user when email and password are correct",async ()=>{
        createAccessToken.mockReturnValue("Ujioukjkiuoo758");
        createRefreshToken.mockReturnValue("Ujirh6cgxwqwe9");
        bcrypt.compare.mockResolvedValue(true);

        authRepository.findByEmail.mockResolvedValue({
             _id:'8976bbed546',
             email:'test@gmail.com',
             password:'tester41587'
        });

        await expect(authService.loginUserService({
            email:'test@gmail.com',
            password:'tester41587'
        })).resolves.toEqual({
            access_token:expect.any(String),
            refresh_token:expect.any(String),
            data:expect.anything()
        })
    })
})