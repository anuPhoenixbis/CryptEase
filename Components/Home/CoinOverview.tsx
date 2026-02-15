/* eslint-disable react-hooks/error-boundaries */
import { fetcher } from '@/lib/coingecko.actions'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { CoinOverviewFallback } from './fallback';
import CandleStickCharts from '../CandleStickCharts';

async function CoinOverview() {
    // this parts will be loaded with the live data component 
    // to fetch basic coin details 
    try {
      // promising all at once to reduce the loading time of the page and load the data parallelly instead 
      const [coin,coinOHLCData] = await Promise.all([
          fetcher<CoinDetailsData>(
          '/coins/bitcoin',
          {
            dex_pair_format:'symbol'
          }
        ),
        fetcher<OHLCData[]>('/coins/bitcoin/ohlc',{
          vs_currency:'usd',
          days:1,
          // interval:'minutely',
          // precision:'full'
        }),
      ])
      // console.log(coin)
      // console.log(coinOHLCData)
      // fetching the coin details data for bitcoin using the fetcher function
      return (
        <div id="coin-overview">
          {/* candlestick chart */}
          <CandleStickCharts data={coinOHLCData} coinId="bitcoin">
            <div className="header pt-2">
                <Image 
                src={coin.image.large} 
                alt={coin.name} 
                width={56} 
                height={56}/>
                <div className="info">
                <p>{coin.name} / {coin.symbol.toUpperCase()}</p>
                <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
                </div>
            </div>
          </CandleStickCharts>
  
        </div>
      )
      // console.log(coin)
    } catch (error) {
      console.error('Error while fetching coin details',error)
      return <CoinOverviewFallback/>
    }
}

export default CoinOverview