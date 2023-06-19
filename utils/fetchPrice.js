
export const fetchPrice = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd');
        const data = await response.json();
        const tezosPriceInUSD = data.tezos.usd;
        return { result: true, price: tezosPriceInUSD };
    } catch (error) {
        console.error(error);
        return { result: false, price: 0 };
    }
};