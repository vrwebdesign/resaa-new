<style lang="scss" scoped>
.tag {
  line-height: 32px;
  border-radius: 30px;
  color: #6c6c6c;
  border: solid 1px #c6c6c6;
  background-color: #fff;
  padding: 0 15px;
  margin-left: 15px;
  margin-bottom: 15px;
  font-size: 12px;
  transition: all 0.25s ease-in;
  &:hover {
    background-color: #6c6c6c;
    color: #fff;
  }
}
</style>

<template>
  <nuxt-link class="tag" to="">
    {{ tag.name }}
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Tag extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly tag!: Object
}
</script>
