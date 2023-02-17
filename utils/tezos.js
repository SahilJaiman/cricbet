
import { wallet } from "./wallet"
import { TezosToolkit} from "@taquito/taquito"

export const tezos = new TezosToolkit("https://ghostnet.smartpy.io");


tezos.setWalletProvider(wallet);

