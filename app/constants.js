const API_KEY_1 = '913046fd-62ec-4982-9a9e-feeb16170dc9';
const API_KEY_2 = '3730f165-e9f9-48d3-8e49-0efe28f1b502';
const API_KEY_3 = '6be2f7db-02c6-40de-8b9c-41f4ffe729fb';
const API_KEY_4 = '238f0a7f-9ff3-4881-ad1e-6cbe97088d6f';
const API_KEY_5 = '0831037a-d0e1-4f88-86c1-a47bd96341ea';

const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/countries';

const API_KEYS = [API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4,API_KEY_5];



export const getApiKey = async () => {
    
    return API_KEY_5;
    for (const key of API_KEYS) {
        
        const status = await checkApiKeyStatus(key);
        
        if (status === "success") {
            console.log("API Key", key);
            return key;
        }
    }
    return API_KEY_1;

}

async function checkApiKeyStatus(key) {

    const res = await fetch(`${MATCHES_ENDPOINT}?apikey=${key}&offset=0`);

    const data = await res.json();

    return data.status;
}


