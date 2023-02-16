<template>
  <div>
    <div v-for="order in orders" :key="order._id">
        <Discussion :order="order" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, inject } from 'vue'
import { PartOrder, CustomerWithOrders, Order } from "../../../server/data";
import Discussion from "../components/Discussion.vue"

const orders: Ref<Order[]> = ref([])
const user: Ref<any> = inject("user")!

async function refresh() {
  orders.value = await (await fetch("/api/orders")).json()
}
onMounted(refresh)

</script>