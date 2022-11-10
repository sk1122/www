---
title: 'Parallel execution of processes'
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

## How does Parallel Execution in VM works?

To acheive parallelization of any process in CS, we need to first know which memory locations will the process will read/write to. 

In a distributed systems, if 2 nodes are simultenously writing to a single memory location, it will result in inconsistent data and result might be wrong. To solve this, we can lock a memory location while a node is updating it, so no 2 or more nodes can update same memory location at the same time.

But, if there are 2 processes, both are reading/writing to different parts of memory locations, then those 2 processes will not lock memory which affects other process. So, we can execute them in parallel and not in order!

2 or more processes, which are writing to different locations and **only** reading from different or same locations can be executed parallely.

Here **only** is focused because if 2 processes are reading from same location then there is not a problem, but if one is writing and another is writing, then there will consistency issues while executing them parallely.

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

FuelVM works on **[EIP-648](https://github.com/ethereum/EIPs/issues/648)** proposed **Access Lists**. Access Lists helps FuelVM do Parallel Execution of Transaction. Every transactions has this list which conveys to VM which contracts the corresponding tx will read/write. If there are 2 or more transaction with same contracts on list `((write, write) || (write, read))`, then those tx's will need to be ordered, but if they have totally different contracts, then they can be executed parallely, thus increasing throughput.

### Sui

Sui is a very interesting blockchain built by the team who was working on Diem. **Sui Objects** are what powers the magic behind Sui's Parallel Execution. Sui objects can be owned by a single or multiple public keys. A Transaction has list of objects which tx will interact with. If tx only interacts with owned objects or object which has single owner in tx proposer, then that tx bypasses consensus and is executed instantly, enabling instant settlement of tx. If tx contains objects with multiple owners, then that tx will go through consensus and executed parallely with other txs whose objects don't collide.

## Conclusion

Nothing. Just Enjoy and Keep Building!!