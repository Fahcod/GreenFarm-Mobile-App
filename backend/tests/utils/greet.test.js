import { greetUser,signupUser,fetchUser } from "../../utils/greet.js";

describe("User related tests",()=>{

    it('It greets the user basing on time',()=>{
    expect(greetUser('Fahad','morning')).toBe('Good morning, Fahad')
  });

  it('it makes sure the user signs up',()=>{
    expect(signupUser('Fahad','twesigyefahad94@gmail.com')).toEqual({
        name:'Fahad',
        email:'twesigyefahad94@gmail.com',
    })
  });

  it('it checks whether user data is returned',async ()=>{
     expect(await fetchUser('76544rdcvb7654vb')).toEqual(
        expect.objectContaining({_id:'76544rdcvb7654vb',name:expect.anything()})
     )
  })


})

