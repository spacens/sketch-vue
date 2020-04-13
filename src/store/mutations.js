export default {
  login(state, userData) {
    state.token = userData.token;
    state.user = userData.user;
    state.loginError = "";
  },
  signup(state, userData) {
    state.token = userData.token;
    state.user = userData.user;
    state.signupError = "";
  },
  updateUser(state, userData) {
    state.user = {
      ...state.user,
      ...userData
    };
  },
  updateAvatar(state, url) {
    state.user = {
      ...state.user,
      avatar: url,
    }
  },
  logout(state) {
    state.token = "";
    state.user = null;
    state.expirationDate = "";
  },
  SET_BAR_IMAGE (state, payload) {
    state.barImage = payload
  },
  SET_DRAWER (state, payload) {
    state.drawer = payload
  },
}
