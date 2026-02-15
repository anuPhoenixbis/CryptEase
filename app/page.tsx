import CoinOverview from '@/Components/Home/CoinOverview'
import TrendingCoins from '@/Components/Home/TrendingCoins'
import { CoinOverviewFallback, TrendingCoinsFallback } from '@/Components/Home/fallback'
import React, { Suspense } from 'react'

// Dummy trending coins data
// const trendingCoinsData: TrendingCoin[] = [
//   {
//     item: {
//       id: 'bitcoin',
//       name: 'Bitcoin',
//       symbol: 'BTC',
//       market_cap_rank: 1,
//       thumb: '/assets/logo.svg',
//       large: '/assets/logo.svg',
//       data: {
//         price: 42321.00,
//         price_change_percentage_24h: {
//           usd: 2.5
//         }
//       }
//     }
//   },
//   {
//     item: {
//       id: 'ethereum',
//       name: 'Ethereum',
//       symbol: 'ETH',
//       market_cap_rank: 2,
//       thumb: '/assets/logo.svg',
//       large: '/assets/logo.svg',
//       data: {
//         price: 2456.80,
//         price_change_percentage_24h: {
//           usd: -1.2
//         }
//       }
//     }
//   },
//   {
//     item: {
//       id: 'cardano',
//       name: 'Cardano',
//       symbol: 'ADA',
//       market_cap_rank: 3,
//       thumb: '/assets/logo.svg',
//       large: '/assets/logo.svg',
//       data: {
//         price: 0.98,
//         price_change_percentage_24h: {
//           usd: 3.8
//         }
//       }
//     }
//   },
//   {
//     item: {
//       id: 'solana',
//       name: 'Solana',
//       symbol: 'SOL',
//       market_cap_rank: 4,
//       thumb: '/assets/logo.svg',
//       large: '/assets/logo.svg',
//       data: {
//         price: 198.45,
//         price_change_percentage_24h: {
//           usd: -0.5
//         }
//       }
//     }
//   }
// ]



async function page() {
  

  
  // the trending coins data is loaded only after coins details is loaded 
  // now it we have multiple await calls we can use Promise.all to load them in parallel and
  // reduce the loading time of the page for faster loading of the html below
  // along with that we can also use suspense and loading UI to show the loading state of the page while the data is being fetched

  return (
    <main className='main-container'>
      <section className="home-grid">
        {/* coin overview section */}
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview/>
        </Suspense>
        {/* trending coins */}
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins/>
        </Suspense>
      </section>
      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page