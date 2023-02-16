<template>
    <div>
        <md-card md-with-hover class="md-card">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <div class="viewport">
                <md-toolbar :md-elevation="1">
                    <md-ripple>
                        <span class="md-title">Title: {{ order.partOrder.title }}</span>
                    </md-ripple>
                </md-toolbar>

                <md-list class="md-double-line">
                    <md-list-item>
                        <md-subheader>Poster: {{ order.customerId }} <br>
                            Time: {{ splitTime(order.partOrder.time).clock[0] }}
                            {{ splitTime(order.partOrder.time).date[0] }}<br>
                        </md-subheader>
                        <md-subheader>
                            <div>
                                <md-icon v-if="order.partOrder.tag.includes('assignments')"
                                    class="md-primary">square</md-icon>
                                <md-icon v-if="order.partOrder.tag.includes('lectures')"
                                    class="md-accent">square</md-icon>
                                <md-icon v-if="order.partOrder.tag.includes('general')">square</md-icon>
                                Tag: {{ order.partOrder.tag }}
                            </div>
                        </md-subheader>
                        <md-subheader>
                            <div v-if="!order.partOrder.private">
                                <md-icon>public</md-icon> public
                            </div>
                            <div v-if="order.partOrder.private">
                                <md-icon>lock</md-icon> private
                            </div>
                        </md-subheader>
                    </md-list-item>
                    <md-divider></md-divider>
                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>{{ order.partOrder.content }}</span>
                        </div>
                        <md-button @click="isThumbUp = !isThumbUp" class="md-icon-button md-list-action">
                            <md-icon v-if="isThumbUp == true" class="md-primary">thumb_up</md-icon>
                            <md-icon v-else>thumb_up</md-icon>
                        </md-button>
                    </md-list-item>
                </md-list>
            </div>
        </md-card>
        <br />
        <br />
    </div>

</template>

<script setup lang="ts">
import { watch, inject, Ref, onMounted, ref, provide } from 'vue'

import { Order, PartOrder } from "../../../server/data";

const user: Ref<any> = inject("user")!

interface Props {
    order?: Order;
}

// default values for props
const props = withDefaults(defineProps<Props>(), {
    order: undefined
});

function tagColor(tag: string) {
    switch (tag) {
        case "general":
            return "green";
        case "lectures":
            return "crimson";
        case "assignments":
            return "blue";
        default:
            return "black";
    }
}

function splitTime(time: string) {
    const date = time.split('T')
    // console.log(date)
    const clock = date[1].split('.')
    return { date, clock }
}

const isThumbUp: Ref<boolean> = ref(false);
function thumbUp(flag: boolean) {
    return !flag
}
</script>