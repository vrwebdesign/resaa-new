<style lang="scss" scoped>
img {
  height: 45px;
  width: auto;
}
</style>

<template>
  <img src="/images/logo.png" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Logo extends Vue {}
</script>
