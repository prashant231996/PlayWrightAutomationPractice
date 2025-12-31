const {test,expect}=require("@playwright/test");

var petId;

test("Add Pet Details",async({request})=>
{

    const response=await request.post(
        "https://petstore.swagger.io/v2/pet",
        {
            data:{
    "id": 101,
    "name": "Mini Mau",
    "status": "ALive",
    "photoUrls": [],
    "category": {
        "id": 12,
        "name": "Cat"
    },
    "tags": [
        {
            "id": 11,
            "name": "Prashant Pet"
        }
    ]
},
headers:{
    "Content-Type":"application/json",
    "api_key":"special-key"

}
        }
    )

    console.log(await response.json());

    await expect(await response.status()).toBe(200);
    var addResponse=await response.json();
    petId=await addResponse.id;
    console.log("Pet Id is "+petId);

});

test("Get pet details", async({request})=>
{
    const response=await request.get("https://petstore.swagger.io/v2/pet/"+petId);
    console.log(await response.json());
    await expect(await response.status()).toBe(200);

});


test("Update Pet Details",async({request})=>
{

    const response=await request.put(
        "https://petstore.swagger.io/v2/pet",
        {
            data:{
    "id": 101,
    "name": "Mini Mau",
    "status": "ALive",
    "photoUrls": [],
    "category": {
        "id": 12,
        "name": "Cat"
    },
    "tags": [
        {
            "id": 11,
            "name": "Prashant Pet Updated"
        }
    ]
},
headers:{
    "Content-Type":"application/json",
    "api_key":"special-key"
}
        }
    )

    console.log(await response.json());

    await expect(await response.status()).toBe(200);
    var addResponse=await response.json();
    expect(await addResponse.id).toBe(petId);

});


test("Delete Pet Details",async({request})=>
{
    const response=await request.delete("https://petstore.swagger.io/v2/pet/"+petId);
    await expect(response.status()).toBe(200);

});