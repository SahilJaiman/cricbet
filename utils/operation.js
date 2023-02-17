
import { contractAddress } from "./contract";
import { tezos } from "./tezos";


export const  addEventOperation = async () => {
    try {
        const contractInstance = await tezos.wallet.at(contractAddress);
        const op = await contractInstance.methods.addEvent(
            0,
            "Match01",
            new Date('2023-10-3 12:00:00').getTime(),
            2,
            false,
            "undeclared",
            "India",
            "Pakistan",
            0,
         
        ).send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};



export const placeBetOperation = async () => {
    try {
        const contractInstance = await tezos.wallet.at(contractAddress);
        const op = await contractInstance.methods.placeBet(
            
                "Match01",
                "India"
            
        ).send(
            
        );
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};

export const resolveBetOperation = async () => {
    try {
        const contractInstance = await tezos.wallet.at(contractAddress);
        const op = await contractInstance.methods.resolveBet(
            
                "Match01",
                "India",
                "Pakistan",
            
        ).send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};
