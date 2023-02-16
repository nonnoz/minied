<template>
    <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <md-card md-with-hover class="md-card">
            <md-toolbar :md-elevation="1">
                <md-ripple>
                    <span class="md-title">Post new discussion</span>
                </md-ripple>
            </md-toolbar>

            <form ref="form">
                <md-list class="md-double-line">
                    <md-list-item>
                        <md-subheader>

                            <label for="title">Title:</label>
                            <input type="text" class="title" v-model="draftPartOrder.title" id="title" required />
                        </md-subheader>
                    </md-list-item>
                    <br />
                    <md-list-item>
                        <md-subheader>
                            <label for="content">Content:</label>
                            <input type="text" class="content" v-model="draftPartOrder.content" id="content" required />
                        </md-subheader>
                    </md-list-item>
                    <md-list-item>
                        <md-subheader>

                            <label for="checkbox" class="check">Set it private</label>
                            <input type="checkbox" id="checkbox" v-model="draftPartOrder.private" />
                        </md-subheader>

                    </md-list-item>
                    <md-list-item>

                        <div>Tag: {{ draftPartOrder.tag }}</div>
                    </md-list-item>

                    <md-list-item>
                        <md-subheader>
                            <div class="tag">
                                <input type="radio" id="general" value="general" v-model="draftPartOrder.tag" />
                                <md-icon>square</md-icon>
                                <label for="general">General</label>
                            </div>
                        </md-subheader>
                    </md-list-item>

                    <md-list-item>
                        <md-subheader>
                            <div  class="tag">
                                <input type="radio" id="lectures" value="lectures" v-model="draftPartOrder.tag" />
                                <md-icon class="md-accent">square</md-icon>
                                <label for="lectures">Lectures</label>
                            </div>
                        </md-subheader>
                    </md-list-item>
                    <md-list-item>
                        <md-subheader>
                            <div  class="tag">
                                <input type="radio" id="assignments" value="assignments" v-model="draftPartOrder.tag" />
                                <md-icon class="md-primary">square</md-icon>
                                <label for="assignments">Assignments</label>
                            </div>
                        </md-subheader>
                    </md-list-item>
                        <md-button class="md-primary" @click="save">Save</md-button>
                        <md-button class="md-primary" @click="submit">Submit</md-button>
                        **Note: must save before submitting
                </md-list>
            </form>
        </md-card>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, inject, Ref } from "vue";
import { PartOrder, CustomerWithOrders } from "../../../server/data";

const customer: Ref<CustomerWithOrders | null> = ref(null)
const user: Ref<any> = inject("user")!

const draftPartOrder: Ref<PartOrder> = ref({
    time: new Date(),
    title: "",
    content: "",
    tag: "",
    private: false,
})

async function refresh() {

    if (user.value) {
        customer.value = await (await fetch("/api/customer")).json()
        draftPartOrder.value = (await (await fetch("/api/customer/draft-order")).json())?.partOrder || null
    }
}
watch(user, refresh, { immediate: true })

async function save() {
    await fetch(
        "/api/customer/draft-order",
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({ partOrder: draftPartOrder.value })
        }
    )
}

async function submit() {
    await fetch(
        "/api/customer/submit-draft-order",
        { method: "POST" }
    )
    await refresh()
}
</script>

<style>
.title {
    width: 100%;
    height: 30px;
}

.content {
    width: 90%;
    height: 80px;
}

.check {
    margin-right: 20px;
}

.tag{
    margin-top: -40px;
}
</style>