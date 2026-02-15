'use server'

import qs from 'query-string'

const BASE_URL = process.env.GECKO_BASE_URL
const API_KEY = process.env.GECKO_API_KEY

if(!BASE_URL) throw new Error('Could not find GECKO_BASE_URL in the environment variables')
if(!API_KEY) throw new Error('Could not find GECKO_API_KEY in the environment variables')

export async function fetcher<T>(
    endpoint:string,
    params?: QueryParams,
    revalidate = 60
) : Promise<T>{
    // fetching data from coingecko api using the endpoint and params provided
    const url = qs.stringifyUrl({
        url: `${BASE_URL}/${endpoint}`,
        query: params
    }, {skipEmptyString: true, skipNull:true });

    // fetching the data 
    const response = await fetch(url,{
        headers:{
            "x_cg_demo_api_key":API_KEY,
            "Content-Type":"application/json"
        } as Record<string,string>,
        next: {revalidate}// setting the cache revalidation time
    })

    if(!response.ok){
        const errorBody: CoinGeckoErrorBody = await response.json()
        .catch(()=>({}))
        // console.log(errorBody)
        console.log(response.statusText)

        throw new Error(`API Error: ${response.status} : ${errorBody.error || response.statusText}`)
    }

    return response.json() 
}