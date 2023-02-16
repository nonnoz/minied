<template>
    <div>
        <div v-for="order in orders" :key="order._id">
            <div v-if="order.state.includes('posted')">

            <Discussion :order="order" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue'
import { PartOrder, CustomerWithOrders, Order } from "../../../server/data";
import Discussion from "../components/Discussion.vue"

const orders: Ref<Order[]> = ref([])

async function refresh() {
  orders.value = await (await fetch("/api/orders")).json()
}
onMounted(refresh)


</script>