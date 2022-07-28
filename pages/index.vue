<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from 'graphql-tag'
import _ from 'lodash'

const route = useRoute()
const user = useUserStore()
const name = route.params.id

const itemsArray = ref([])

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

const COL_AMOUNT = 5

const { result } = useQuery(GET_ITEMS)

itemsArray.value = _.chunk(result.value?.items, Math.ceil(result.value?.items.length / COL_AMOUNT)) || []

watch(result, result => {
  itemsArray.value = _.chunk(result.items, Math.ceil(result.items.length / COL_AMOUNT))
})

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <template v-if="itemsArray.length">
    <div flex>
      <ul flex-col v-for="items in itemsArray" w-sm>
        <li v-for="item in items" :key="item.id" flex-row m-3 w-xsm h-xsm border-solid b-1 border-dark-2>
          <a :href="item.wikiLink" target="_blank">
            <div><img h-12 w-12 inline :src="item.iconLinkFallback" /></div>
            <div h-12>{{ item.name }}</div>
          </a>
        </li>
      </ul>
    </div>
  </template>
</template>
