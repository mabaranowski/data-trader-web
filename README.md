# data-trader-web

## Description
This project is a client-side of **Data Trader**.
The purpose is to provide the interface for users to interact with. 
It also dispatches requests to connected sensors on a user's local network.
It's built as an **Angular** single page application that communicates with server-side API.

It is a part of **Data Trader** project:
- For a **server-side**, go to [data-trader-api](https://github.com/mabaranowski/data-trader-api.git)
- For a **sensor-mock**, go to [data-trader-sensor](https://github.com/mabaranowski/data-trader-sensor.git)

## Scheduler
Its purpose is to send a request to the device and pass the response payload to backend API.
The cron job runs every 1 minute. It asks connected devices for data, which are later sent to API for storage and aggregation.

## Requirements
- Node.js 13.12.0+
- npm 6.14.4+
- Angular CLI 9.1.0+

## Install
```
$ npm install
```
## Build
```
$ ng build
```
## Develop
```
$ ng serve
```
