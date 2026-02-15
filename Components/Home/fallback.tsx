import DataTable from '@/Components/DataTable'
import { Skeleton } from '@/Components/ui/skeleton'
import React from 'react'

/**
 * CoinOverviewFallback: Loading skeleton for the coin overview section
 * Matches the #coin-overview-fallback CSS styling
 */
export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <Skeleton className="header-image" />
        <div className="info">
          <Skeleton className="header-line-sm" />
          <Skeleton className="header-line-lg" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <Skeleton className="period-button-skeleton" />
        <Skeleton className="period-button-skeleton" />
        <Skeleton className="period-button-skeleton" />
      </div>
      <div className="chart">
        <Skeleton className="chart-skeleton" />
      </div>
    </div>
  )
}

/**
 * TrendingCoinsFallback: Loading skeleton for the trending coins table
 * Uses DataTable with skeleton rows matching the #trending-coins-fallback CSS styling
 */
export function TrendingCoinsFallback() {
  // Create 5 dummy rows for the table skeleton
  const dummyRows = Array.from({ length: 5 }, (_, i) => ({ id: `skeleton-${i}` }))

  // Define table columns with skeleton cells
  const skeletonColumns: DataTableColumn<{ id: string }>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: () => (
        <div className="name-link">
          <Skeleton className="name-image" />
          <Skeleton className="name-line" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: () => <Skeleton className="h-4 w-12" />,
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => <Skeleton className="h-4 w-20" />,
    },
  ]

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        data={dummyRows}
        columns={skeletonColumns}
        rowKey={(row) => row.id}
        tableClassName="trending-coins-table"
      />
    </div>
  )
}
