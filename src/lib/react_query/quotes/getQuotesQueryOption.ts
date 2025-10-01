import { queryOptions } from "@tanstack/react-query";



export default function getQuotesQueryOption() {
    return queryOptions({
        queryKey: ['quotes'],
        queryFn: getAllQuotes,
    })
};


export type Quotes = Awaited<ReturnType<typeof getAllQuotes>>
export async function getAllQuotes() {
    const { quotes } = await fetch(`https://dummyjson.com/quotes`)
        .then(res => res.json())
        .catch(err => err instanceof Error ? err?.message : 'fetching error ')
    return quotes
}