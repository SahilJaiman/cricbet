
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



export const placeBetOperation = async (id,team,amt ) => {
    try {
        const contractInstance = await tezos.wallet.at(contractAddress);
        const op = await contractInstance.methods.placeBet(
                team,
                id
        ).send({
            amount: amt,
            mutez:false,
        });
        console.log("I am before !!");
        try {
            console.log("I am inside try !!");
            await op.confirmation();
        } catch (error) {
            console.log("Error in Confirmation");
            return;
        }
        
        console.log("I am after !!");
        return;
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
