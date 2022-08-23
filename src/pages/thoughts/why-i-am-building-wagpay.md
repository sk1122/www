---
title: 'Why I am building Fetcch (Prev. WagPay)?'
description: 'Why the fuck I chose to startup when I had a fantastic job in hand (obv with handsome pay) at 18?'
date: 'August 24, 2022'
layout: ../../layouts/Layout.astro
---

### Little background about me

WagPay started on 5th Feb, at exactly 4 am in the morning, I was casually watching a youtube video and an idea came to my mind, there were many businesses that wanted to accept multiple cryptos but it was just to intgrate all of them, so why not create a crypto payment gateway?

So, I shared this idea with Mandar and we quickly started to get on the table and ship it.

I built the whole version from ground up (backend + frontend + sdk) and we give it out to some businsesses to test it out.

We were giving out a super simple SDK, where biz would create a payment request and user could pay in any token they wanted on that unique link generated for that payment request.

The response was good but the product was unfinished yet, we wanted to enable any token <> any token transfers, so as a user you could pay in any token and merchant would receive in any token and that brought us into the cross chain rabbithole.

We thought this was a major problem to solve and instantly got onto this by building an liquidity aggregator and integrating it into payment gateway and it was a hit!

But then one thing led to another and we lost our interest in building a payment gateway and decided to go all in on the cross chain future.

While building liquidity aggregator, we saw that many bridges were requesting users to have gas tokens on destination chains to withdraw tokens and minimum amount was very high for most of the bridges and P2P payments weren't possible in this scenario.

Satoshi had envisoned Crypto to be a simple P2P payment system, it is possible in a single chain enviornment, but world is cross chain now and we can't achieve this goal with this high minimum amount, so we came up with our bridge design, which supports super low transaction value starting from a ~3$ and Wallet ID Protocol which abstracts away addresses from users.

### But why did I chose to build WagPay (Now Fetcch), even though my bank balance was drying up and I had bills to pay?

I am a developer by heart and it always excites me to solve a problem which is harder and which could unlock the true potential of the tech that I am working on.

And at Fetcch (Prev WagPay), we are exactly doing that, unlocking the potential of blockchains and making it accessible to masses.

## What is Fetcch (Prev WagPay)?

I have ranted a lot about things that are not related, but let's get to the point **What the fuck is Fetcch?**

**Fetcch's main goal is to solve blockchain's ux problems**

*We not building sleek UIs and claiming to have solved UX*

How are we solving Blockchain UX?

Main problem in onboarding people to web3 is ***choice fatigue***

Choice Fatigue is a real problem in web3 and it is hurting the onboarding of normal web2 users, there are just so many things to choose from

We have 10+ blockchain, 100+ Wallets to choose from, every wallet and dApp support different blockchain

![Wallet options while connecting to a dApp](https://i.ibb.co/fXwH8mF/blocknative.png)

*Wallet options while connecting to a dApp (there are more...)*

Then there are wallet addresses 
- they are big
- they are random

Many naive people have send tokens to wrong addresses or sent the wrong address, because addresses and a big blob of random text, its very hard to memorize and you always need to copy from somewhere, which is a actual bummer!!

Any other reason like low TPS, frequent hacks is just pure bullshit

- There exists blockchains like Solana with High TPS and L2 solutions like Polygon with High TPS and closer to Ethereum
- Hacks are a reason of poor security practices and buggy code, which can be fixed in future cycles

So to summarize these are the 2 main problems stopping the mass adoption of web3

- Choice Fatigue
- Addresses


At Fetcch, we are trying to solve this 2 problems

We are building suite of protocols which will solve both problems while increasing the Blockchain UX

### We are building a Bridge

As unassuming it sounds, its quite interesting, its not just another bridge but we are enabling swapping any token to any token directly at the bridge level with better managed liquidity pools and increased security.

This will be the first step taken to solve Choice Fatigue, it will interconnect many blockchains and just make it buttery smooth to move from Chain A to Chain B.

We will manage liquidity pools of stables on every chain, it will be self rebalancing and then using DEX aggregators we can swap from any token to any token with lesser overall fees and time taken.

This will solve

- Choice Fatigue
  - User can access smart contracts on Chain B from Chain A
    - Still user needs to manually swap and execute the call

### We are building an ID Protocol

We are building a Cross Chain, Composable Wallet ID Protocol

Let's understand it better with the story of Alice & Bob

```
Alice and Bob are friends

Bob owes Alice 100 USDT (SOL) which he borrowed for some work

Alice wants Bob to repay her, but Bob says "I don't have any token on Solana now, I just don't use Solana anymore"

But Alice is still adamant that she wants Bob to repay her on Solana only and not other chain 'cause she doesn't use any other chain and those tokens will either go in vain or she would have to bridge it herself

Why Alice should do all the work herself, when she helped Bob in first place?

So, Bob decides to bridge it himself, first he will go for Bridge & DEX hunting or will use some bridge aggregator, after finding a suitable bridge + dex pair, then he will ask Alice for her Solana address and wait for that Bridge & DEX to process transactions and he will pay multiple gas fees for that transaction, if it is "that type" of bridge, then he would also need to have gas on destination chain🤦

Bob thinks to himself, "Why did Satoshi decide on using this clumsy addresses instead of shorter IDs like UPI has?"

Bob doesn't know shit about cryptography and blockchain it seems😁

But he posed a serious question, Why isn't their any ID System which could be composable and not bound to a chain?

- ENS is there, but its single chain
- Centralized solutions exists, but they are not composable and are centralized, duh

Is it too hard? or is it not necessary?

We are debunking all this myths and building WagPay ID

This will be 3Cs - concise, composable, cross chain ID

WagPay ID can be connected to various addresses, data will be stored on decentralized storage solutions like Arweave or IPFS 

In above scenario, Alice will have alice@wallet1 and Bob will have bob@wallet2, bob@wallet2 will pay any token he wants from any chain and alice@wallet1 will set Solana as her default chain, so any incoming payment would directly get bridged to Solana
```

Wallet ID Protocol will directly be integrated into various wallets and they can start issuing IDs to their users

So, if Steak Wallet integrates WagPay ID Protocol, they can then issue ids like `name@steak` or `name.steak`, and then this ID can talk to any ID present in WagPay ID Protocol irrespective of wallet or chain.

This will not just solve P2P payments but Choice Fatigue in connecting wallets also.

So right now, there are 100s of options to choose from whenever we are connecting to dApp, but if the dApp has integrated WagPay ID SDK, then it will just have a single button called `Connect Wallet`, where the user will enter their ID and a connection request will be sent to their wallet.

dApps can also request a single time transaction using above mechanism, let's say if a payment gateway integrates WagPay ID SDK, it can send payment request to a ID and receive payment, instead of first connecting then transacting, as payment gateway requires only a single transaction to execute.