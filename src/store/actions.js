import axios, { setToken } from '../services/axios-auth'

export default {
  login({ commit }, authData) {
    return new Promise((resolve, reject) => {
      axios
        .post('/rest-auth/login/', {
          email: authData.email,
          password: authData.password
        })
        .then(res => {
          setToken(res.data.token);
          commit('login', {
            token: res.data.token,
            user: res.data.user
          });
          resolve(res);
        })
        .catch(reject);
    })
  },
  signup({ commit }, userData) {
    return new Promise((resolve, reject) => {
      axios
        .post("/rest-auth/registration/", {
          name: userData.name,
          email: userData.email,
          password1: userData.password1,
          password2: userData.password2
        })
        .then(res => {
          setToken(res.data.token);
          commit("signup", {
            token: res.data.token,
            user: res.data.user
          });
          resolve(res)
        })
        .catch(reject);
    })
  },
  logout({ commit }) {
    commit("logout");
    return axios.post("/rest-auth/logout/")
  },
  updateProfile({ commit }, profile) {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.put("/rest-auth/user/", profile);
        commit("updateUser", profile);
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  uploadAvatar({ commit }, formData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put("/rest-auth/user/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        commit("updateAvatar", response.avatar)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  },
}
