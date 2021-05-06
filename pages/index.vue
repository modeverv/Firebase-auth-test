<template>
  <div class="container">
    <p class="title is-1 is-spaced">user: {{ $store.getters.getUserName }}</p>
    <button
      v-if="
        $store.getters.getUserUid == '' || $store.getters.getUserUid == null
      "
      class="button is-primary is-rounded"
      @click="login"
    >
      ログイン
    </button>
    <button
      v-if="
        $store.getters.getUserUid != '' && $store.getters.getUserUid != null
      "
      class="button is-primary is-rounded"
      @click="logout"
    >
      ログアウト
    </button>
    <nuxt-link to="/test">ログインしてたら別ページが表示できる</nuxt-link>
    <h2>TODO</h2>
    <ul>
      <li>[完了]ログアウトないですね</li>
      <li>[完了]DJのドメインのみ許可ないですね</li>
      <li>[完了]ログイン結果をlocalstrageとかに保持すれば良いのでしょうか</li>
    </ul>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  methods: {
    login() {
      console.log("login");
      this.$store.dispatch("login");
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (!/^.*@dream\-jack\.com$/.test(user.email)) {
        return;
      }
      if (user) {
        this.$store.dispatch("onReload", { user });
      }
    });
  }
};
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
