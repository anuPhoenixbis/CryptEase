'use client'

import { getCandlestickConfig, getChartConfig, PERIOD_BUTTONS, PERIOD_CONFIG } from "@/constants";
import { fetcher } from "@/lib/coingecko.actions";
import { convertOHLCData } from "@/lib/utils";
import { CandlestickSeries, createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import {  useEffect, useRef, useState, useTransition } from "react"

function CandleStickCharts({
    children,
    data,
    coinId,
    height=360,
    initialPeriod="daily"
}: CandlestickChartProps) {
    // chart container ref to attach the chart to the div elem in the dom
    // chart ref to store the chart instance created by the lib and use it to update the chart when the data changes
    // candle series ref to store the candlestick series instance created by the lib and use it to update the series data when the data changes
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    const [loading,setLoading] = useState(false);
    const [period,setPeriod] = useState<Period>(initialPeriod);
    const [ohlcData,setOHLCData] = useState<OHLCData[]>(data ?? [])
    const [isPending,startTransition] = useTransition()
    //useTransition is a React hook that lets you mark some state updates as non-urgent (low priority) so they don’t block the UI.
    // In simple terms:
    // It keeps your app responsive while heavy updates are happening.
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOHLCData(data ?? [])
    },[data,coinId])

    const fetchOHLCData = async(selectedPeriod:Period)=>{
        try {
            const config = PERIOD_CONFIG[selectedPeriod]
            // data fetch of OHLC
            const newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`,{
                    vs_currency:'usd',
                    days:config.days,
                    // interval:config.interval,
                    // precision:'full'
                })
            setOHLCData(newData ?? [])//update with the new data
        } catch (error) {
            console.error('Failed to fetch OHLC Data', error)
        }
    }
    const handlePeriodChange = (newPeriod:Period)=>{
        if(newPeriod === period) return;
        
        // setting the useTransition here
        startTransition(()=>{
            setPeriod(newPeriod)//initially set the period and then we can show that we can fetch the data inside the useTransition
            fetchOHLCData(newPeriod)
        })
    }

    // to handle fetch the ohlc data and define and render the chart 
    useEffect(()=>{
        const container = chartContainerRef.current;
        if(!container) return;//if the ref doesn't changes then we return

        const showTime = ['daily','weekly','monthly'].includes(period)

        // defining our chart here
        const chart = createChart(container,{
            ...getChartConfig(height,showTime),
            width: container.clientWidth
        })
        // series chart is defined here
        const series = chart.addSeries(CandlestickSeries,getCandlestickConfig())

        // passing our ohlc data here to form a chart 
        // using the data formatter from the utils
        series.setData(convertOHLCData(ohlcData));
        chart.timeScale().fitContent()

        // passing down our current refs 
        chartRef.current = chart;
        candleSeriesRef.current = series

        const observer = new ResizeObserver((entries)=>{
            if(!entries.length) return;//if there are no entires for the observer then we return
            chart.applyOptions({width: entries[0].contentRect.width})//the chart takes the full width of the container of however the width it maybe
        })

        observer.observe(container);
        // removing the leftovers to avoid data leaks
        return ()=>{
            observer.disconnect();
            chart.remove()
            chartRef.current = null;
            candleSeriesRef.current = null;
        }
    },[height])

    // to handle switches b/w the timelines ,i.e., 1D, 1Week, etc;
    useEffect(()=>{
        if(!candleSeriesRef.current) return;//if no chart then we return nothing
        const convertedToSeconds = ohlcData.map((item)=>
            [Math.floor(item[0]/1000),item[1],item[2],item[3],item[4]] as OHLCData
        )

        const converted = convertOHLCData(convertedToSeconds);
        candleSeriesRef.current.setData(converted)
        chartRef.current?.timeScale().fitContent()
    },[ohlcData,period])
  return (
    <div id="candlestick-chart">
        <div className="chart-header">
            <div className="flex-1">{children}</div>
            <div className="button-group">
                    <span className="text-sm mx-2 font-medium text-purple-100/50">
                    Period:
                    </span>
                    {PERIOD_BUTTONS.map(({value,label})=>{
                        return <button 
                                    key={value} 
                                    className={period === value ? 'config-button-active' : 'config-button'} 
                                    onClick={()=>handlePeriodChange(value)} 
                                    disabled={period===value || isPending}>
                            {label}
                        </button>
                    })}
            </div>
        </div>
        {/* here we will include the chart */}
        <div ref={chartContainerRef} className="chart" style={{height}} />
    </div>
  )
}

export default CandleStickCharts