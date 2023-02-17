import axios from "axios";
import { contractAddress } from "./contract";
export const fetchStorage = async () => {
    try {
        const res = await axios.get("https://api.ghostnet.tzkt.io/v1/contracts/"+contractAddress+"/storage");
        return  res.data;
    } catch (err) {
        throw err;
    }
};
