<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from 'graphql-tag'
import _ from 'lodash'

const route = useRoute()
const user = useUserStore()
const name = route.params.id

const items = ref([])

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


const { result } = useQuery(GET_ITEMS)

items.value = result.value?.items || []
items.value.sort((a, b) => (b?.avg24hPrice - a?.avg24hPrice))

watch(result, result => {
  if (!result) {
    return
  }
  items.value = [...result.items]
  const y = items.value.sort((a, b) => (b?.avg24hPrice - a?.avg24hPrice))
  console.log(y)
  console.log(items.value)
})

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <template v-if="items.length">
    <div class="grid">
      <!-- w-sm p-4 m-3 w-xsm h-xsm border-solid b-1 border-dark-2 -->
      <div v-for="item in items" wLg p-3>
        <a :href="item.wikiLink" target="_blank">
          <div><img h-12 w-12 inline :src="item.iconLinkFallback" /></div>
          <div h-12>{{ item.name }}</div>
          <div h-12 font-bold>prix moyen 24h<br><span bg="green" rounded text="black" p-1>{{ item.avg24hPrice
          }}₽</span>
          </div>
          <div h-12 font-bold>prix précédent il y a 48h<br><span bg="green" rounded text="black" p-1>{{ item.avg24hPrice
              + item.changeLast48h
          }}₽</span>
          </div>
          <div h-12 font-bold>changement de <br><span bg="green" rounded text="black" p-1>{{ item.changeLast48hPercent
          }}%</span>
          </div>
        </a>
      </div>
    </div>
  </template>
</template>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  align-items: stretch;
}

.grid>div {
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
}

.grid>div img {
  max-width: 100%;
}

.text {
  padding: 0 20px 20px;
}

.text>button {
  background: gray;
  border: 0;
  color: white;
  padding: 10px;
  width: 100%;
}
</style>