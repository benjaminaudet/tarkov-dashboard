import { acceptHMRUpdate, defineStore } from 'pinia'
import { useQuery } from "@vue/apollo-composable";
import gql from 'graphql-tag'

const GET_ITEMS = gql`
  query getItems {
    items(lang: en) {
      name
      shortName
      basePrice
      iconLink
      iconLinkFallback
      wikiLink
      avg24hPrice
      fleaMarketFee
      low24hPrice
      high24hPrice
      changeLast48h
      changeLast48hPercent
    }
  }
`

export const useItemsStore = defineStore('items', () => {

  const items = ref()

  if (items.value)
    return { items }

  const { result } = useQuery(GET_ITEMS, null, {fetchPolicy: 'network-only'})

  watch(result, result => {
    items.value = result.items
  })

  return {
    items,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useItemsStore, import.meta.hot))
