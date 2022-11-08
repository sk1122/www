---
title: 'UDP vs TCP'
description: 'Recently, I built a file transfer program in rust on top of UDP & TCP, and am here sharing my thoughts on both!'
date: 'November 10, 2022'
layout: ../../layouts/Layout.astro
---

UDP and TCP are transport protocols used in networking to transport packets between 2 or more peers.

Both are widely used and recently I tinkered around with them and built a file sharing application on raw implementation of both protocols in rust.

Let's first define both of these protocols

## TCP

TCP stands for Transport Communication Protocol and you most likely have used this as it is what is currently powering web through http/1.1 and http/2.

TCP emphaizes more on acknowledgments, meaning, it waits for receiving peer to acknowledge that they have receive the package or not. This leads a smoother flow, as we as a dev can be sure that no packet loss has occured, as TCP takes care of that.

TCP is super secure protocol to transfer information between 2 or more peers, it works something like this

(2 Peers)
- A peer sends open connection request to another peer
- They acknowledge the request and send their response back
- A connection is now opened and they both can share each other data through this channel (it was only once in http/1.1, but in http/2 we can share stream of information through one open connection)

## UDP

UDP stands for User Datagram Protocol and you most likely have heard it through QUIC protocol, which is built on top of UDP. It powers http/3!

UDP is very interesting, as in it doesn't wait for other peers acknowledgement of receival of package. Most of time in TCP is gone in waiting for acknowledgements that peer has received that package or not, leading to longer waiting times for request to get fulfiled. UDP removes this overhead and let's you customize the "acknowledgement" behaviour however you want, obviously if you want to have it otherwise you can choose to not have it, this will lead you to not know which packets were successful and which weren't.

UDP works something like this

(2 Peers)
- A peer sends message to another peer

## What have I built?

I got into networking blackhole few months back and started from basic blocks of networking to this transport protocols, decided to build a few prototypes (what other way is better than building small PoCs?)

I built a file sharing cli one on top of TCP and other on top of UDP. Github here (implementation is in rust)

### Why file sharing?

I think file sharing is a perfect way to test transport protocols because files are big and we have to share lot of bytes over the network, most of the times, this bytes will overflow the buffer size and we need to send it in chunks instead of whole at once. This surely increases the complexity of application but it tests a lot of critical stuff in these protocols like network failure, loss of packets, joining packets on server etc

## So, UDP or TCP?

TCP file sharing is surely more secure because we don't lose packets (we lose packets, but we atleast know which packet we lost), we don't have to worry about server failures, it will stop transfer if it fails, and this is all at the protocol level, so as a dev, we just have to check for network failures.

UDP file sharing was dead simple, i just arranged those packets with first byte allocated to type of file and remaining bytes were file data. As UDP doesn't do any checks, it is super fast (not that you notice enough) but it surely is, I implemented a simple check system on top of UDP (btw less checks than TCP), we only check for loss of packets, it was still fast than TCP.

## Conclusion

I think TCP is best suited for applications where we can't afford to lose any information like file sharing, messages, financial data, TCPs robust checks mitigates large number of failures and as a dev it will be a lot easier to just go with TCPs.

UDP is best suited for applications where we can afford to lose some information like video calling, multiplayer games etc. QUIC has launched, it is built on top of UDP but it also has initial checks coupled with streams, which let's us send many packets in a single connection, thus decreasing open connection time of TCP.