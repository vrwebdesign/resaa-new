<style lang="scss" scoped>
main.doctors-main {
  margin-top: 30px;
}
</style>

<template>
  <main class="doctors-main">
    <v-container>
      <div class="d-flex flex-wrap">
        <template v-if="$device.isMobile">
          <FilterMobile v-model="filter" />
          <ListDoctorsMobile
            @sort="onSort"
            :doctors="doctors"
            :loading="loading"
            :pageCurrent="page"
            :total="paginationLength"
            :pageChange="pageChange"
          />
        </template>
        <template v-else>
          <FilterDesktop v-model="filter" />
          <ListDoctorsDesktop
            @sort="onSort"
            :doctors="doctors"
            :loading="loading"
            :pageCurrent="page"
            :total="paginationLength"
            :pageChange="pageChange"
          />
        </template>
      </div>
    </v-container>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
Component.registerHooks(['head', 'fetch'])
@Component({
  components: {
    FilterMobile: () =>
      import('@/components/Pages/Doctors/Filter/Mobile/FilterMobile.vue'),
    FilterDesktop: () =>
      import('@/components/Pages/Doctors/Filter/Desktop/FilterDesktop.vue'),
    ListDoctorsMobile: () =>
      import(
        '@/components/Pages/Doctors/ListDoctors/Mobile/ListDoctorsMobile.vue'
      ),
    ListDoctorsDesktop: () =>
      import(
        '@/components/Pages/Doctors/ListDoctors/Desktop/ListDoctorsDesktop.vue'
      ),
  },
})
export default class DoctorsPage extends Vue {
  limit: number = 10
  page: number = 1
  query = null
  doctors: any = []
  totalItems: number = 0
  loading = false

  filter = {
    query: null,
    specialty: [],
    sickness: [],
    orderBy: 'NONE',
  }

  seo = {
    title: 'پزشکان و متخصصان سامانه رسا',
  }

  public head() {
    return {
      title: this.seo.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'با جستجو در بین پزشکان سامانه رسا در تخصص های زنان و زایمان، اطفال، مغز و اعصاب، روانشناسی و ... متخصص مورد نظر خود را انتخاب کنید و به صورت تلفنی به پاسخ سوالات خود برسید.',
        },
      ],
    }
  }

  get offset() {
    return (this.page - 1) * this.limit
  }
  get paginationLength() {
    return Math.ceil(this.totalItems / this.limit) || 10
  }

  onSort(sort: any) {
    this.filter.orderBy = sort
  }

  async fetch() {
    await this.getDoctors()
  }

  async pageChange(page: number) {
    this.page = page
    this.getDoctors()
  }

  async getDoctors() {
    try {
      this.loading = true
      let { result } = await this.$service.doctors.query({
        fields:
          'id,specialty,subscriberNumber,firstName,lastName,imagePath,expertise',
        limit: this.limit,
        query: this.query,
        offset: this.offset,
      })
      this.doctors = result.doctors
      console.log(
        'DoctorsPage -> getDoctors -> this.doctors',
        this.doctors.length
      )
      this.totalItems = result.doctorsTotalCount
      this.loading = false
    } catch (error) {
      console.log('DoctorsPage -> getDoctors -> error', error)
    }
  }
}
</script>
