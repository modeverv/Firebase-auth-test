<template>
  <div class="container">
    <p class="title is-1 is-spaced">user: {{ $store.getters.getUserName }}</p>
    <button class="button is-primary is-rounded" @click="login">
      ログイン
    </button>
    <nuxt-link to="/test">ログインしてたら別ページが表示できる</nuxt-link>
    <h2>TODO</h2>
    <ul>
      <li>ログアウトないですね</li>
      <li>[完了]DJのドメインのみ許可ないですね</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
     console.log('login')
     this.$store.dispatch('login')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
/*  min-height: 100vh;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
  text-align: center;
}
</style>
