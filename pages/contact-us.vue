
<style lang="scss" scoped>
.contact-us-container {
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  @include media(sm) {
    padding: 8px;
  }
}

.section-title {
  text-align: right;
  color: var(--v-primary-base);
  font-size: 2.725rem;
  font-weight: 500;
  margin-bottom: 16px;
}

.map {
  width: 100%;
  padding-bottom: 20px;
  height: 100%;
  min-height: 400px;
  ::v-deep {
    .GMap__Wrapper {
      height: 100%;
    }
  }
}

.phone-number-container {
  text-align: right;
  direction: rtl;
}

.label {
  color: var(--v-secondary-base);
  display: inline-block;
  font-weight: 500;
}

.phone-number-text {
  display: inline-block;
  color: var(--v-secondary-base);
  direction: ltr;
}
.address-wrapper {
  > div + div {
    margin-top: 8px;
  }
}
.address-container {
  text-align: right;
  direction: rtl;
}

.address-label {
  color: var(--v-secondary-base);
  display: inline-block;
  font-weight: 500;
}

.address-text {
  display: inline-block;
  text-align: justify;
}

.email-container {
  text-align: right;
  direction: rtl;
}

.email-label {
  display: inline-block;
  color: var(--v-secondary-base);
  font-weight: 500;
}

.email-text {
  display: inline-block;
  color: var(--v-secondary-base);
}

.contact-us-form {
  margin-top: 20px;
}

.contact-us-form-text-area {
  position: relative;

  textarea {
    width: 100%;
    text-align: right;
    background-color: #f5f5f5;
    border: none;
    border-radius: 20px;
    resize: none;
    direction: rtl;
    padding: 15px 20px;
    margin-bottom: 20px;
    &::placeholder {
      color: #b4b3c0;
      opacity: 1;
    }
    &.is-invalid {
      box-shadow: 0 0 8px -1px red;
    }
  }
}

.contact-us-submit-button {
  left: 15px;
  bottom: 30px;
  position: absolute !important;
  width: 100px;
}

.contact-us-input {
  margin-bottom: 20px;
  border-radius: 20px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: right;
  border: none;
  background-color: #f5f5f5;
  padding: 15px 20px;

  &::placeholder {
    color: #b4b3c0;
    opacity: 1;
  }
  &.is-invalid {
    box-shadow: 0 0 8px -1px red;
  }
}
.invalid-feedback {
  color: red;
  margin-top: -12px;
  margin-right: 16px;
}
</style>

<template>
  <v-container>
    <div class="contact-us-container">
      <div class="section-title">تماس با ما</div>
      <v-layout row wrap>
        <v-flex md6 sm12 pa-3>
          <div class="address-wrapper">
            <div class="address-container">
              <div class="label">آدرس :&nbsp;</div>
              <div class="address-text">{{contactInfo.address}}</div>
            </div>
            <!-- <div class="phone-number-container">
              <div class="label">تلفن دفتر:&nbsp;</div>
              <div class="phone-number-text">{{contactInfo.phoneNumber}}</div>
            </div>-->
            <div class="phone-number-container">
              <div class="label">تلفن پشتیبانی:&nbsp;</div>
              <a
                :href="`tel:${contactInfo.support.value}`"
                class="phone-number-text"
              >{{contactInfo.support.text}}</a>
            </div>
            <div class="email-container">
              <div class="label">ایمیل :&nbsp;</div>
              <a :href="`mailto:${contactInfo.email}`" class="email-text">{{contactInfo.email}}</a>
            </div>
          </div>

          <div class="contact-us-form">
            <v-loading v-if="ajaxLoading" mode="relative"></v-loading>
            <!-- -->
            <form @submit.prevent>
              <div class="form-group">
                <input
                  v-model="form.fullName"
                  v-validate="'required'"
                  name="fullName"
                  class="contact-us-input form-control"
                  :class="{ 'is-invalid': submitted && errors.has('fullName') }"
                  placeholder="نام و نام خانوادگی"
                />
                <div
                  v-if="submitted && errors.has('fullName')"
                  class="invalid-feedback"
                >{{ errors.first('fullName') }}</div>
              </div>
              <div class="form-group">
                <input
                  v-model="form.phoneNumber"
                  v-validate="'required|mobile'"
                  name="phoneNumber"
                  class="contact-us-input form-control"
                  :class="{ 'is-invalid': submitted && errors.has('phoneNumber') }"
                  placeholder="شماره تماس"
                />
                <div
                  v-if="submitted && errors.has('phoneNumber')"
                  class="invalid-feedback"
                >{{ errors.first('phoneNumber') }}</div>
              </div>
              <div class="form-group">
                <input
                  v-model="form.email"
                  v-validate="'required|email'"
                  name="email"
                  class="contact-us-input form-control"
                  :class="{ 'is-invalid': submitted && errors.has('email') }"
                  placeholder="ایمیل"
                />
                <div
                  v-if="submitted && errors.has('email')"
                  class="invalid-feedback"
                >{{ errors.first('email') }}</div>
              </div>
              <div class="contact-us-form-text-area">
                <textarea
                  name="message"
                  v-validate="'required'"
                  v-model="form.message"
                  :class="{ 'is-invalid': submitted && errors.has('message') }"
                  rows="10"
                  placeholder="متن پیام..."
                ></textarea>
                <div
                  v-if="submitted && errors.has('message')"
                  class="invalid-feedback"
                >{{ errors.first('message') }}</div>
                <v-btn
                  @click="submitForm"
                  color="secondary"
                  rounded
                  class="contact-us-submit-button"
                >ارسال</v-btn>
              </div>
            </form>
          </div>
        </v-flex>
        <v-flex md6 sm12 pa-3>
          <no-ssr>
            <div class="map">
              <GMap
                ref="mapRef"
                :center="{lat: 35.717143, lng:51.387869}"
                :zoom="18"
                style="width: 100%; height:100%"
              >
                <GMapMarker ref="mapMarker" :position="{lat: 35.717143, lng:51.387869}" />
              </GMap>
            </div>
          </no-ssr>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'nuxt-property-decorator'

@Component
export default class component_name extends Vue {
  form = {}
  submitted = false
  ajaxLoading = false
  head() {
    return {
      title: 'برقراری تماس با سامانه رسا',
      link: [
        {
          rel: 'canonical',
          href: `${process.env.SITE_URL}${this.$route.path}`,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'برای ارسال نظرات خود به سامانه رسا می‌توانید با وارد کردن اطلاعات و متن پیام خود، با ما در تماس باشید. آدرس دفتر شرکت، تلفن تماس و ایمیل رسا را به خاطر بسپارید',
        },
      ],
    }
  }
  get contactInfo() {
    return this.$store.state.contactus
  }
  created() {
    const dict = {
      custom: {
        message: {
          required: () => 'وارد کردن پیغام اجباری است',
        },
        fullName: {
          required: () => 'وارد کردن فیلد نام اجباری است',
        },
        email: {
          required: () => 'وارد کردن ایمیل اجباری میباشد',
          email: () => 'فرمت وارد شده صحیح نمیباشد',
        },
        phoneNumber: {
          mobile: () => 'فرمت وارد شده صحیح نمیباشد',
        },
      },
    }
    this.$validator.localize('fa', dict)
  }
  async submitForm() {
    this.submitted = true
    let valid = await this.$validator.validate()
    if (!valid) {
      return
    }
    this.ajaxLoading = true
    let { status } = await this.$axios.$post('Inquiries', this.form)
    if (status == 'OK') {
      this.$dialog
        .message('درخواست شما با موفقیت ثبت شد')
        .success()
        .alert()
      this.form = {}
    }
    this.ajaxLoading = false
  }
}
</script>

