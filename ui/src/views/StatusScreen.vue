<template>
  <div class="mx-3 my-3">
    <b-button @click="refresh" class="mb-2">Refresh</b-button>
    <div v-for="order in orders" :key="order._id">
      <div v-if="user?.preferred_username == order.customerId || order.partOrder.private==false">
        <Discussion :order="order" />
      </div>
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