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
  async login({ commit }) {
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
      //.signInWithRedirect(provider)
      .signInWithPopup(provider)
      .then(function(result) {
        const user = result.user;
        const email = result.additionalUserInfo.profile.email;
        console.log(email);
        if (!/^.*@dream\-jack\.com$/.test(email)) {
          console.log("domain error");
          alert("djじゃないからログイン許さん")
          throw new Exception("invalid domain");
        }
        console.log("success : " + user.uid + " : " + user.displayName);
        commit("setUserUid", user.uid);
        commit("setUserName", user.displayName);
      })
      .catch(function(error) {
        var errorCode = error.code;
        console.log("error : " + errorCode);
      });
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
