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
    //
  },
  login({ commit }) {
    commit("setUserUid", null);
    commit("setUserName", null);
    console.log("login action");
    const provider = new firebase.auth.GoogleAuthProvider();
    //provider.setCustomParameters({
    //  hd: "dream-jack.com"
    //});
    // ここまで
    //firebase.auth().signInWithPopup(provider);
    firebase
      .auth()
      //.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        //.signInWithRedirect(provider)
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            const user = result.user;
            const email = result.additionalUserInfo.profile.email;
            console.log(email);
            if (!/^.*@dream\-jack\.com$/.test(email)) {
              console.log("domain error");
              alert("djじゃないからログイン許さん");
              commit("setUserUid", null);
              commit("setUserName", null);
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
