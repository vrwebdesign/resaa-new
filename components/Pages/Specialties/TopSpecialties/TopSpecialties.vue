<style lang="scss" scoped>
.top-specialties-wrapper {
  .main-title {
    font-size: 16px;
    font-weight: 600;
    @include media(sm) {
      display: none;
    }
  }
  ::v-deep {
    .card-specialtie {
      width: 48%;
      margin-bottom: 15px;
      .v-card {
        box-shadow: 0 2px 8px 0 rgba(249, 164, 41, 0.3);
      }
      @include media(sm) {
        margin-bottom: 60px;
        width: 18%;
      }
    }
    @include media(xs-only) {
      .card-specialtie:nth-child(even) {
        .v-card {
          box-shadow: 0 2px 8px 0 rgba(19, 209, 243, 0.3);
        }
      }
    }
    @include media(sm) {
      .card-specialtie:nth-child(n + 6) {
        .v-card {
          box-shadow: 0 2px 8px 0 rgba(19, 209, 243, 0.3);
        }
      }
    }
  }
}
</style>

<template>
  <v-container>
    <div class="top-specialties-wrapper">
      <div class="main-title text-center mb-5">
        دسترسی سریع به تخصص‌ها و بیماری‌ها
      </div>
      <div class="d-flex flex-wrap justify-space-between">
        <CardSpecialtie v-for="(item, index) in 10" :key="index" />
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CardSpecialtie from './CardSpecialtie.vue'

@Component({
  components: {
    CardSpecialtie,
  },
})
export default class TopSpecialties extends Vue {}
</script>
