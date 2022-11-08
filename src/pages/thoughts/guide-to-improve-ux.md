---
title: 'A Guide to Improve User Experience of dApp using Fetcch'
description: 'Currently, there are loads of dApps that are just unusabled by folks other than developers, they are so complex to sign in to and use.'
date: 'November 7, 2022'
layout: ../../layouts/Layout.astro
---

# A Guide to Improve User Experience of dApp using Fetcch

Currently, there are loads of dApps that are just unusabled by folks other than developers, they are so complex to sign in to and use.

dApps will not reach mass usability if we don't have simple ux like web2 or more simpler than that!

But with current tooling its not possible, let's jot down some problems that current user face while using a simple dApp, let's delve into a user's journey while using a dApp

## Sign In

Signing In in web3 was meant to be simpler than web2, click on connect wallet, approve connection from wallet and boom, you have a connection.
But its far from reality, first you have to choose between 100s of wallets, some dApps might support your wallet, some might not, then if its a mobile wallet, you have to open it up, scan qr and then approve connection.
This is a very hard UX compared to web2, where you can just enter email and password and boom, you are logged in, or more simpler, just enter your email and OTP, no need to remember password itself!

You might disagree with me on this, but just think, you are a user who has used facebook, google, github for his entire life and now you are using a dApp. On the first step you have been shown this
![](https://i.imgur.com/T2R425i.png)
*Good luck finding your desired wallet👍*

### How to improve this?

If users only need to add their alphanumeric wallet id (for ex - `satyam@metamask` replacing wallet addresses) and approve connection on their wallet, it can be any wallet, any device, no QR code, wallet's device can be in another country and you can connect to website from another (duh, only you can connect your wallet, also why would you be in different countries?)

But what if you just want to sign a single transaction or sign a single message and you are done? then why go through all of this process, just enter your wallet id and you will receive a sign request on your wallet, sign that transaction/message and boom, you are done without even connecting your wallet!

### Show me some code

Integration is pretty easy

**React**

- Installing package
```bash!
yarn add @fetcch/react-auth wagmi ethers
```
- Add providers
```jsx!
import { FetcchAuthProvider } from "@fetcch/react-auth"
...
return (
    <FetcchAuthProvider {...options}>
        <App />
    </FetcchAuthProvider>
)
...
```
- Add Connect Button
```jsx!
import { FetcchAuthButton } from "@fetcch/react-auth"
...
return (
    <FetcchAuthButton />
)
...
```
- Transaction Request
```jsx
import { useTransactionRequest } from "@fetcch/react-auth"

export const Component = () => {
    
    const { request } = useTransactionRequest()
    
    return (
        <div>
            <button onClick={() => request.create({
                payer: "block@fetcch",
                recipient: "satyam@fetcch",
                amount: "1000000000000",
                token: "0xeeeeeeeeeeeee",
                chain: "2" // fetcch chain id
            })}>
                Transaction Request
            </button>
        </div>
    )
}
```

You can find more about `@fetcch/auth` - [Documentation](https://docs.fetcch.xyz)

## Aggregating Identities

Wallet IDs can be connected to multiple addresses from multiple blockchains and this can help a lot for dApp developers to build seamless multi chain dApps.

Developers will not have to
- Manage different code base for 
    - signing
    - interacting
    - authenticating
- Force user to change wallets/chain to access chain specific parts of dApps
    - You will get a list while connecting wallet id, about which chain this id supports

To understand this more easily, let's take an example of Aave, if it were to integrate **Fetcch**

**Current Flow**
- Connect to Aave using multiple options of wallet
- Change chain to polygon to access polygon pools
- Deposit some tokens in some pool
- Open arbitrium tab to access its pools
- Try depositing tokens in that pool, you will be asked to change chain

Switching chains becomes even more harder if you use mobile wallets with desktop dApps and it is one of the main reason that new folks do not use blockchain and its dApps, because if dApps don't have enough checks in place, they could end up paying on some different address and tokens will be gone forever.

### How to improve?

As said previously, Fetcch Wallet IDs are connected to various addresses from various blockchains.

So a identity - `satyam@metamask`, will be connected to a default address, which will be let's say ethereum and there will be other multiple addresses which can be connected to a list of chains.
So for ex.
```bash!
satyam@metamask
|
|__ Default Address (Ethereum)
|
|__ Other Addresses
    |
    |__ Other Address 1 (Ethereum, Polygon, Avalanche, BSC)
    |
    |__ Other Address 2 (BSC, Fantom, zkSync)
    |
    |__ Other Address 3 (Solana, if metamask supports it)
```
If you connect to a Fetcch Wallet ID, you directly get access to all of these addresses, plus to all the faboulus cross chain infra by Fetcch, so your user will not have to worry about chains.
As a dApp, you will send which chain and optionally address you want wallet to execute this transaction on and wallet will either execute same chain tx or cross chain tx depending on parameters.

### Show me some code

Install dependencies

```bash!
yarn add @fetcch/react-auth ethers
```

```jsx!
import { ethers } from 'ethers'
import { useProvider } from '@fetcch/react-auth'

export const Component = () => {
    ...
    
    const { contract, loading } = useContract({
        address: "0x000",
        abi: abi,
        chainId: "2" // optional (use fetcch chain id to support all of evm and non evm chains)
    })
    
    const signTransaction = async () => {
        const tx = await contract.something(...params, {
            chainId: "3" // optional (can send chain id optinally, if you want to execute transaction on different chain other than what provider is based on)
        })
    }
    ...
}
```

So, even if your user is connected to Polygon, you can still explicity tell wallet to execute this transaction through BSC and this will lower the chances of different chain issue.