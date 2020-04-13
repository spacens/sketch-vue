<template>
  <v-app-bar id="app-bar" absolute app color="green" flat height="75">
    <v-spacer />

    <v-btn class="ml-2 white--text" min-width="0" text to="/login">
      Login
    </v-btn>

    <v-btn class="ml-2 white--text" min-width="0" text to="/signup">
      Signup
    </v-btn>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from 'vuetify/lib'

// Utilities
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AuthHeader',
}
</script>
