const API_KEY_1 = '913046fd-62ec-4982-9a9e-feeb16170dc9';
const API_KEY_2 = '3730f165-e9f9-48d3-8e49-0efe28f1b502';
const API_KEY_3 = '6be2f7db-02c6-40de-8b9c-41f4ffe729fb';
const API_KEY_4 = '238f0a7f-9ff3-4881-ad1e-6cbe97088d6f';
const API_KEY_5 = '0831037a-d0e1-4f88-86c1-a47bd96341ea';
const API_KEY_6 = 'bbe0cd17-d817-4b3b-900a-9dad747f651d';
const API_KEY_7 = '19825eba-1db3-4dc7-a8c6-6da441bc174d';
const API_KEY_8 = '4f0bf5b3-8606-4ea8-a17b-746d984a475f';
const API_KEY_9 = 'ae5d4ca3-7cd5-4f0e-a42d-d7813d044276';
const API_KEY_10 = 'a51d6b86-cbed-4c79-817d-b8c29c4fc562';

export const API_KEY_ERROR = '404';

const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/countries';

const API_KEYS = [API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4,API_KEY_5,API_KEY_6,API_KEY_7,API_KEY_8,API_KEY_9,API_KEY_10];



export const getApiKey = async () => {
    
   
    for (const key of API_KEYS) {
        
        const status = await checkApiKeyStatus(key);
       
        if (status === "success") {
            console.log("API Key", key);
            return key;
        }
    }
    return API_KEY_ERROR;

}

async function checkApiKeyStatus(key) {

    const res = await fetch(`${MATCHES_ENDPOINT}?apikey=${key}&offset=0`);

    const data = await res.json();
    console.log("Data", data);

    return data.status;
}


