<style lang="scss" scoped>
.section-search {
  padding-bottom: 50px;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>

<template>
  <section class="section-search">
    <v-container class="d-flex flex-column align-center">
      <div class="title text-center">پزشک یا روان‌شناس خود را پیدا کنید.</div>

      <SearchForm class="mt-6" @submit="onSubmit" />

      <SearchResultMobile
        v-if="$device.isMobile"
        class="mt-6"
        :doctors="doctors"
      />
      <SearchResultDesktop v-else class="mt-6" :doctors="doctors" />
    </v-container>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SearchForm from './SearchForm.vue'
import { Doctor } from '~/models/Doctor'

@Component({
  components: {
    SearchForm,
    SearchResultDesktop: () => import('./SearchResultDesktop.vue'),
    SearchResultMobile: () => import('./SearchResultMobile.vue'),
  },
})
export default class SectionSearch extends Vue {
  form = {}
  doctors: Doctor[] = []

  async onSubmit(form: any) {
    try {
      const { result } = await this.$service.doctors.query({
        fields:
          'id,specialty,subscriberNumber,firstName,lastName,imagePath,expertise',
        limit: 10,
        query: form.q,
      })
      this.doctors = result.doctors
    } catch (error) {}
  }
}
</script>
