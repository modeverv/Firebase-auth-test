<template>
  <div>
    <p class="title is-1 is-spaced">user: {{ $store.getters.getUserName }}</p>
    <p>DJの機密情報ここ???</p>
    <nuxt-link to="/">戻る</nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: "auth",
}

</script>

<style>
</style>
