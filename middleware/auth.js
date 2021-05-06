export default function({ store, redirect }) {
  if (!store.getters.getUserUid) {
    return redirect("/");
  }
}
