<template>
  <v-app>
    <v-content>
      <v-container fill-height fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title class="white--text text-uppercase font-weight-bold">Login</v-toolbar-title>
                <v-spacer/>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field ref="username" v-model="username" :rules="[() => !!username || 'This field is required']"
                    prepend-icon="mdi-email" label="Email" placeholder="Your Email" required />
                  <v-text-field ref="password" v-model="password" :rules="[() => !!password || 'This field is required']"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-lock" label="Password" placeholder="*********" counter required @keydown.enter="login"
                    @click:append="showPassword = !showPassword" />
                </v-form>
              </v-card-text>
              <v-divider class="mt-5" />
              <v-card-actions>
                <v-spacer/>
                <v-btn align-center justify-center :color="submitColor" @click="login">
                  Login
                </v-btn>
              </v-card-actions>
              <v-snackbar v-model="snackbar" :color="color" :top='true'>
                {{ errorMessages }}
                <v-btn dark flat @click="snackbar = false">
                  Close
                </v-btn>
              </v-snackbar>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'login',
  data: function() {
    return {
      username: '',
      password: '',
      errorMessages: '',
      snackbar: false,
      color: 'danger',
      showPassword: false,
    }
  },

  computed: {
    submitColor() {
      return this.username && this.password ? 'primary' : 'general'
    },
  },

  // Sends action to Vuex that will log you in and redirect to the dash otherwise, error
  methods: {
    login() {
      let email = this.username
      let password = this.password
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          this.errorMessages = JSON.stringify(err.response.data)
          this.snackbar = true
        })
    },
  },
  metaInfo() {
    return {
      title: 'Sketch | Login',
    }
  },
}
</script>
