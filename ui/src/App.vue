<template>
  <div>
    <md-toolbar md-elevation="0" class="md-primary">
      <h3 class="md-title">
        <span v-if="user?.name">Welcome, {{ user.name }}</span>
        <span v-else>MiniEd</span>
      </h3>
      <div>
        <md-button v-if="user?.name == null" href="/api/login">Login</md-button>
        <md-button v-if="user?.name" @click="logout">Logout</md-button>
        <form method="POST" action="/api/logout" id="logoutForm" />
      </div>
    </md-toolbar>
    <md-tabs md-sync-route class="md-primary">
      <md-tab md-label="Home" to="/" exact></md-tab>
      <md-tab v-if="user?.roles?.includes('customer')" md-label="My Discussions" to="/customer" exact></md-tab>
      <md-tab v-if="user?.roles?.includes('operator')" md-label="My Work Screen" to="/operator" exact></md-tab>
      <md-tab v-if="user?.roles?.includes('customer')" md-label="New Discussion" to="/add" exact></md-tab>
    </md-tabs>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'

const user = ref({} as any)
provide("user", user)

onMounted(async () => {
  user.value = await (await fetch("/api/user")).json()
})

function logout() {
  ; (window.document.getElementById('logoutForm') as HTMLFormElement).submit()
}
</script>