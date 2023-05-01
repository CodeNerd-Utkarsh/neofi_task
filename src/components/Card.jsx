/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Button, SelectMenu, TextInputField } from "evergreen-ui"
import { coins } from '../assets/coins'
import "./Card.css"

function Card() {
    let constantPrice = 80;
    let wss_gateway = "wss://stream.binance.com:9443/ws"
    const [realtimePrice, setRealtimePrice] = useState(0.0000)
    const [currentToken, setCurrentToken] = useState({
        "label": "Ethereum",
        "value": "ethusdt",
        "icon": "https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png"
    })

    const [filter, setFilter] = useState('')

    const [investingAmount, setInvestingAmount] = useState(0)

    useEffect(() => {
        let socket = new WebSocket(`${wss_gateway}/${currentToken.value}@kline_1s`)
        socket.onmessage = (e) => {
            let res = JSON.parse(e.data)
            let price = new Number(res.k.c) * constantPrice
            setRealtimePrice((prev) => (
                prev = price.toFixed(2)
            ))

        }
        return () => {
            socket.close()
            setRealtimePrice(0)
        }
    }, [currentToken])
    return (
        <div className="mycard">
            <svg className='cardsvg' width="470" height="567" viewBox="0 0 470 567" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_13_275" fill="white">
                    <path fillRule="evenodd" clipRule="evenodd" d="M234.502 52C256.593 52 274.502 34.0914 274.502 12C274.502 5.95962 278.816 0 284.857 0L452 0C461.941 0 470 8.05888 470 18V549C470 558.941 461.941 567 452 567H18C8.05888 567 0 558.941 0 549V18C0 8.05887 8.05887 0 18 0L184.147 0C190.188 0 194.502 5.95962 194.502 12C194.502 34.0914 212.411 52 234.502 52Z" />
                </mask>
                <path fillRule="evenodd" clipRule="evenodd" d="M234.502 52C256.593 52 274.502 34.0914 274.502 12C274.502 5.95962 278.816 0 284.857 0L452 0C461.941 0 470 8.05888 470 18V549C470 558.941 461.941 567 452 567H18C8.05888 567 0 558.941 0 549V18C0 8.05887 8.05887 0 18 0L184.147 0C190.188 0 194.502 5.95962 194.502 12C194.502 34.0914 212.411 52 234.502 52Z" fill="#0B0819" />
                <path d="M273.502 12C273.502 33.5391 256.041 51 234.502 51V53C257.146 53 275.502 34.6437 275.502 12H273.502ZM284.857 1H452V-1H284.857V1ZM469 18V549H471V18H469ZM452 566H18V568H452V566ZM1 549V18H-1V549H1ZM18 1H184.147V-1H18V1ZM234.502 51C212.963 51 195.502 33.5391 195.502 12H193.502C193.502 34.6437 211.858 53 234.502 53V51ZM184.147 1C189.456 1 193.502 6.31318 193.502 12H195.502C195.502 5.60605 190.92 -1 184.147 -1V1ZM1 18C1 8.61116 8.61116 1 18 1V-1C7.50659 -1 -1 7.50659 -1 18H1ZM18 566C8.61117 566 1 558.389 1 549H-1C-1 559.493 7.5066 568 18 568V566ZM469 549C469 558.389 461.389 566 452 566V568C462.493 568 471 559.493 471 549H469ZM452 1C461.389 1 469 8.61116 469 18H471C471 7.50659 462.493 -1 452 -1V1ZM275.502 12C275.502 6.31319 279.548 1 284.857 1V-1C278.084 -1 273.502 5.60605 273.502 12H275.502Z" fill="url(#paint0_linear_13_275)" mask="url(#path-1-inside-1_13_275)" />
                <defs>
                    <linearGradient id="paint0_linear_13_275" x1="235" y1="0" x2="235" y2="567" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#46425E" />
                        <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="coin" >
                <img src={currentToken.icon} alt={currentToken.label} height={35} width={35} />
            </div>
            <div className="fields">
                <p className="currvalue"><span>Current Value </span><span className='value'>&#8377;
                    {realtimePrice}</span></p>
                <div className="row">
                    <SelectMenu
                        id="ipf"
                        title="Search coins..."
                        onFilterChange={(filter) => setFilter(filter)}
                        options={coins.map((ele) => ({ label: ele.label, value: ele.value, icon: ele.icon }))}
                        selected={currentToken}
                        onSelect={(item) => setCurrentToken(item)}
                    >
                        <Button id="ipf">{
                            <>
                                <img src={currentToken.icon} alt={currentToken.label} style={{ height: "30px", width: "30px", objectFit: "contain", margin: "0 25px" }} />
                                <span>{currentToken.label}</span>
                            </>
                        } </Button>
                        {/* <Button id="ipf">{currentToken.label || 'Select coin...'}</Button> */}
                    </SelectMenu>
                </div>
                <div className="row">
                    <TextInputField
                        id="ipf"
                        label="Amount you want to invest"
                        placeholder="0.00"
                        onChange={(e) => setInvestingAmount(e.target.value)}
                    />

                </div>
                <div className="row">
                    <TextInputField
                        id="ipf"
                        label={`Estimate Number of ${currentToken.label} You will Get`}
                        placeholder={
                            realtimePrice ? ((investingAmount / realtimePrice).toFixed(4)) : (0.00)
                        }
                        // value={(investingAmount / realtimePrice).toFixed(4)}
                        disabled
                    />
                </div>
                <div className="row">
                    <Button className="btn">
                        Buy
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Card

// let coins = [
//     {
//         label: 'Bitcoin',
//         value: 'btcusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1.png',
//     },
//     {
//         label: 'Ethereum',
//         value: 'ethusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',
//     },
//     {
//         label: 'Chiliz',
//         value: 'chzusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/4066.png',
//     },
//     {
//         label: 'Theta Net',
//         value: 'thetausdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/2416.png',
//     },
//     {
//         label: 'Aave',
//         value: 'aaveusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/7278.png',
//     },
//     {
//         label: 'Rocketpool',
//         value: 'rplusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/2943.png',
//     },
//     {
//         label: 'ApeCoin',
//         value: 'apeusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/18876.png',
//     },
//     {
//         label: 'Hedera',
//         value: 'hbarusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/4642.png',
//     },
//     {
//         label: 'Filecoin',
//         value: 'filusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/2280.png',
//     },
//     {
//         label: 'Stellar',
//         value: 'xlmusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/512.png',
//     },
//     {
//         label: 'UniSwap',
//         value: 'uniusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/7083.png',
//     },
//     {
//         label: 'Flux',
//         value: 'fluxusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/3029.png',
//     },
//     {
//         label: 'BNB',
//         value: 'bnbusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png',
//     },
//     {
//         label: 'XRP',
//         value: 'xrpusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/52.png',
//     },
//     {
//         label: 'Solana',
//         value: 'solusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/5426.png',
//     },
//     {
//         label: 'Polkadot',
//         value: 'dotusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/6636.png',
//     },
//     {
//         label: 'Litecoin',
//         value: 'ltcusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/2.png',
//     },
//     {
//         label: 'TRON',
//         value: 'trxusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1958.png',
//     },
//     {
//         label: 'Avalanche',
//         value: 'avaxusdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/5805.png',
//     },
//     {
//         label: 'Decentraland',
//         value: 'manausdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1966.png',
//     },
//     {
//         label: 'Algorand',
//         value: 'algousdt',
//         icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/4030.png',
//     }]