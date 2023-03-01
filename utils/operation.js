
import { contractAddress } from "./contract";
import { tezos } from "./tezos";


export const  addEventOperation = async (match) => {
    try {
        const contractInstance = await tezos.wallet.at(contractAddress);
        const op = await contractInstance.methods.addEvent(
            0,
            match.id,
            Math.floor(new Date(match.startTime).getTime()/1000),
            1000000,
            false,
            "undeclared",
            match.teamA,
            match.teamB,
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
