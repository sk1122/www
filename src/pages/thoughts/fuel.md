---
title: 'My thoughts on parallel execution'
description: 'Current CPUs are multicore and can handle a lot of operation, VMs need to use all of those available cores.'
date: 'November 7, 2022'
layout: ../../layouts/Layout.astro
---

Parallelization of processes in not a new thing in computer science, ever since, CPUs are getting more cores, developers are using those to create a more efficient program, which can utilize CPUs strength to possibly 100%.

Don't confuse parallelization with concurrency, both are different paradigms, concurrency is useful in IO bound application whereas parallelization is useful in CPU bound application.

Blockchain VMs are trying to parallelize transaction execution since quite a time and few have already achieved success in doing that.

But first of all, let' discuss

## What is Parallel Transaction Execution?

Let's say, there is Alice & Bob.

Alice wants to send some ETH to someone.

Bob wants to execute a trade on Uniswap.

In current implementation of EVM, these 2 transactions will be executed one after another and while executing a transaction, a global lock is imposed on state, meaning nobody can change state while transaction is executing. So, first Alice's tx is executed, and Bob waits till A's tx is executed, and after that B's tx is executed. This increases the overall wait time for Bob, decreasing the TPS.

But does Bob needs to wait for Alice's tx though? If we look at the transaction, both are interacting with different addresses and doing completely different things, in simple words, they both are accessing/writing different parts of memory. So can we execute them parallely?

Yes, we can execute them parallely because a state change initiated by Alice's tx will not affect Bob's tx and vice versa.

So, in the case of parallel transaction, Bob will not have to wait for Alice's tx to be completed, Blockchain VM can parallely take B's transaction and execute it. Now, instead of taking (A's time + B's time), it will Max(A's time, B's time) for both transaction to be executed successfully

![Parallel Execution](https://github.com/sk1122/www/blob/main/public/img/parallel.png?raw=true)

## Why it is needed?

Parallel execution is good for blockchain's because it can help them increase TPS by executing transactions parallely.

For eg.

- Ethereum - **~10-20 TPS**
- Solana - **~2000-3000 TPS**
- and many more blockchain en route on launch.

Ethereum's TPS could potentially increased to ~500 TPS, if EVM is able to use all cores on CPU.

[A good podcast on this](https://www.youtube.com/watch?v=DhBkrc9dECg)

## Various VMs that have Parallel Execution

### Solana

Solana might be the first blockchain that introduced parallel transaction execution. Solana's Sealevel VM can use as many core as a validator has, thus using total compute power that a CPU can offer and increasing TPS by a lot of multiples. [Read more](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192)

Solana works on an account model. Programs(Smart contract) are stateless in Solana and all of the data is stored in accounts which can be owned by a single or multiple public key(s).

Transactions in Solana are list of instructions and instructions has list of accounts that this tx wants to read/write from. So, Sealevel knows which accounts this tx will interact with before even executing it, so it will only lock those accounts which it is interacting with and other tx interacting with other accounts can be processed parallely!

![Parallel Execution](https://github.com/sk1122/www/blob/main/public/img/solana-parallel-1.png?raw=true)
*This will be executed parallely*

![Parallel Execution](https://github.com/sk1122/www/blob/main/public/img/solana-parallel-2.png?raw=true)
*This will **not** be executed parallely*

### FuelVM

Fuel is an optimistic rollup and instead of using EVM like everyone else, they have built their own new VM called **FuelVM**, it is an UTXO based VM which has the power of parallel transaction execution and many new things. It also has its own new language called **Sway** which is inspired by Rust.

