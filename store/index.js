import firebase from "~/plugins/firebase";

export const state = () => ({
  userUid: "",
  userName: ""
});

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid;
  },
  setUserName(state, userName) {
    state.userName = userName;
  }
};

export const actions = {
  logout({ commit }) {
    firebase.auth().signOut();
    commit("setUserUid", null);
    commit("setUserName", null);
  },
  login({ commit }) {
    commit("setUserUid", null);
    commit("setUserName", null);
    console.log("login action");
    const provider = new firebase.auth.GoogleAuthProvider();
    // 本番は下記で絞り込むとユーザーフレンドリー
    //provider.setCustomParameters({
    //  hd: "dream-jack.com"
    //});
    // ここまで
    //firebase.auth().signInWithPopup(provider);
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          //.signInWithPopup(provider)
          .signInWithRedirect(provider)
          .then(function(result) {
            const user = result.user;
            const email = result.additionalUserInfo.profile.email;
            console.log(email);
            if (!/^.*@dream\-jack\.com$/.test(email)) {
              console.log("domain error");
              alert("djじゃないからログイン許さん");
              return;
            }
            console.log("success : " + user.uid + " : " + user.displayName);
            commit("setUserUid", user.uid);
            commit("setUserName", user.displayName);
          });
      })
      .catch(function(error) {
        var errorCode = error.code;
        console.log("error : " + errorCode);
      });
  },
  onReload({ commit }, { user }) {
    commit("setUserUid", user.uid);
    commit("setUserName", user.displayName);
  }
};

export const getters = {
  getUserUid(state) {
    return state.userUid;
  },
  getUserName(state) {
    return state.userName;
  }
};
