<style lang="scss" scoped>
.main-header {
  z-index: 3;
  &.v-app-bar:not(.v-app-bar--fixed) {
    background-color: transparent !important;
    border-color: transparent !important;
    box-shadow: unset;
  }
  ::v-deep {
    .v-app-bar__nav-icon {
      border: none;
      background: none;
      box-shadow: none !important;
      .v-btn__content {
        color: $primary-color;
      }
    }

    .theme--dark.v-btn.v-btn--icon {
      color: $primary-color;
    }

    .charge {
      height: 28px;
    }
  }
}
</style>

<template>
  <v-app-bar
    class="main-header"
    color="white"
    dense
    dark
    :fixed="scrolled"
    clipped-left
  >
    <v-app-bar-nav-icon @click="$emit('toggleNavbar')"></v-app-bar-nav-icon>

    <div class="logo">
      <nuxt-link to="/">
        <v-img
          height="25"
          width="60"
          src="/images/logo.png"
          alt="رسا"
          contain
        />
      </nuxt-link>
    </div>

    <v-spacer />

    <nuxt-link :to="avatarLink">
      <v-avatar size="30">
        <img src="/images/icons/ic_account_circle.svg" />
      </v-avatar>
    </nuxt-link>

    <v-btn to="/charge" outlined dense class="resaa-btn charge mr-3">
      افزایش اعتبار
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HeaderMobile extends Vue {
  get avatarLink() {
    if (this.$auth.loggedIn) {
      return '/patient/profile'
    } else {
      return '/patient/login'
    }
  }

  limitPosition = 300
  scrolled = false
  lastPosition = 0

  handleScroll() {
    if (
      this.lastPosition < window.scrollY &&
      this.limitPosition < window.scrollY
    ) {
      // move up!
      this.scrolled = true
    }

    if (this.lastPosition > window.scrollY) {
      // move down
      this.scrolled = false
    }

    this.lastPosition = window.scrollY
    this.scrolled = window.scrollY > 250
  }

  mounted() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
