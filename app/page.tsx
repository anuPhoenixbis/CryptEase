import Categories from '@/Components/Home/Categories'
import CoinOverview from '@/Components/Home/CoinOverview'
import TrendingCoins from '@/Components/Home/TrendingCoins'
import { CoinOverviewFallback, TrendingCoinsFallback, CategoriesFallback } from '@/Components/Home/fallback'
import React, { Suspense } from 'react'



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
        <Suspense fallback={<CategoriesFallback/>}>
          <Categories/>
        </Suspense>
      </section>
    </main>
  )
}

export default page