<template>
  <v-app>
    <v-content>
      <v-container fill-height fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title class="white--text text-uppercase font-weight-bold">Signup</v-toolbar-title>
                <v-spacer/>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field ref="fullname" v-model="fullname" :rules="[() => !!fullname || 'This field is required']"
                    prepend-icon="mdi-account" label="Full name" placeholder="e.g. John Doe" required />
                  <v-text-field ref="email" v-model="email" :rules="[() => !!email || 'This field is required']" prepend-icon="mdi-email"
                    label="Email" placeholder="abc@example.com" required />
                  <v-text-field ref="password" v-model="password" :rules="[() => !!password || 'This field is required']"
                    prepend-icon="mdi-lock" label="Password" placeholder="*********" type="password" counter required />
                  <v-text-field ref="pwdConfirm" v-model="pwdConfirm" :rules="[() => !!pwdConfirm || 'This field is required']"
                    prepend-icon="mdi-lock" label="Password Confirm" placeholder="*********" counter required
                    type="password" />
                </v-form>
              </v-card-text>
              <v-divider class="mt-5" />
              <v-card-actions>
                <v-spacer/>
                <v-btn align-center justify-center :color="submitColor" @click="signup">
                  Signup
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
import { mapState } from 'vuex'

export default {
  name: 'signup',
  data: function() {
    return {
      errorMessages: '',
      snackbar: false,
      color: 'danger',
      fullname: '',
      email: '',
      password: '',
      pwdConfirm: '',
    }
  },

  computed: {
    submitColor() {
      return this.isFormValid() ? 'primary' : 'general'
    },
  },

  // Sends action to Vuex that will log you in and redirect to the dash otherwise, error
  methods: {
    isFormValid() {
      return true
    },
    signup() {
      this.$store
        .dispatch('signup', {
          name: this.fullname,
          email: this.email,
          password1: this.password,
          password2: this.pwdConfirm,
        })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          this.errorMessages = JSON.stringify(err.response.data)
          this.snackbar = true
        })
    },
  },
  metaInfo() {
    return {
      title: 'Sketch | Signup',
    }
  },
}
</script>
