<style lang="scss" scoped>
.sort-item {
  font-weight: bold;
  line-height: 45px;
  padding: 0 15px;
  &.active {
    background-color: #d6fffa;
  }
}
</style>

<template>
  <div
    class="sort-item"
    :class="{
      active: active === true,
    }"
    @click="onClick"
  >
    {{ sort.label }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

interface SortItemInterface {
  label: String
  value: String
}

@Component
export default class SortItem extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly sort!: SortItemInterface

  @Prop({
    type: Boolean,
    required: true,
  })
  readonly active!: Boolean

  onClick() {
    this.$emit('click', this.sort.value)
  }
}
</script>
