import * as nearAPI from "near-api-js";
import { Contract } from "near-api-js";

const { connect, keyStores, WalletConnection } = nearAPI;

const CONTRACT_NAME = "example-contract.testnet"

const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  contractName: CONTRACT_NAME,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};


export async function initContract() {
    // connect to NEAR
    const near = await connect(config);
    console.log("near connected")

    // create wallet connection
    const connection = new WalletConnection(near)

    window.walletConnection = connection

    window.accountId = connection.getAccountId()
    console.log("connected as:", window.accountId)

    window.contract = await new Contract(connection.account(), CONTRACT_NAME, {
        viewMethods: ["get"],
        changeMethods: ["increment"],
    })
};
export const nearSignIn = () => {
   window.walletConnection.requestSignIn(CONTRACT_NAME)
   console.log("signin: connected as:", window.accountId)
}

export const nearSignOut = () => {
    window.walletConnection.signOut()
    console.log("signout: connected as:", window.accountId)
}