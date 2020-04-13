<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Profile
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Full Name" class="purple-input" v-model="user.name" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Phone" class="purple-input" type="number" v-model="user.phone" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-menu v-model="birthdayMenu" :close-on-content-click="false" lazy transition="scale-transition"
                    offset-y min-width="auto">
                    <template v-slot:activator="{ on }">
                      <v-text-field label="Birthday" readonly :value="user.date_of_birth" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker locale="en-in" v-model="user.date_of_birth" no-title @input="birthdayMenu = false"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12">
                  <v-textarea class="purple-input" label="About Me" value="" />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" @click="save">
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-text class="text-center">
            <image-input v-model="avatar">
              <div slot="activator">
                <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                  <span>Add Photo</span>
                </v-avatar>
                <v-avatar size="150px" v-ripple v-else class="mb-3">
                  <img :src="avatar.imageURL" alt="avatar">
                </v-avatar>
              </div>
            </image-input>
            <v-slide-x-transition>
              <div v-if="avatar && saved == false" class="d-flex justify-center">
                <v-btn class="primary mr-0" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
              </div>
            </v-slide-x-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :color="snackColor" :top='true'>
      {{ message }}
      <v-btn dark flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import ImageInput from '../../../components/ImageInput'

export default {
  name: 'login',
  data: function() {
    const { name, phone, date_of_birth, avatar } = this.$store.state.user
    return {
      user: {
        name,
        phone,
        date_of_birth,
      },

      snackbar: false,
      snackColor: 'danger',
      message: '',
      birthdayMenu: false,

      saving: false,
      saved: true,
      avatar: {
        imageURL: avatar
      },
    }
  },
  components: {
    ImageInput: ImageInput
  },
  watch:{
    avatar: {
      handler(value) {
        this.saved = false
      },
      deep: true
    }
  },
  methods: {
    save() {
      this.$store.dispatch("updateProfile", this.user)
      .then(res => {
        this.snackColor = 'success'
        this.message = 'Successfully updated profile'
        this.snackbar = true
      })
      .catch(err => {
        this.message = JSON.stringify(err.response.data)
        this.snackColor = 'danger'
        this.snackbar = true
      })
    },
    uploadImage() {
      this.saving = true
      this.$store.dispatch("uploadAvatar", this.avatar.formData)
      .then(res => {
        this.savedAvatar()
      })
      .catch(err => {
        this.savedAvatar()
      })
    },
    savedAvatar() {
      this.saving = false
      this.saved = true
    },
  },
}
</script>
