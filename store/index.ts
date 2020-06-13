import { Action, Module, VuexModule } from 'vuex-module-decorators'

@Module
export default class Index extends VuexModule {
  @Action
  nuxtClientInit() {}

  @Action
  nuxtServerInit(ctx: any) {
    const token = ctx.$auth.getToken('local')
    const seeIntro = ctx.$auth.$storage.getCookie('seeIntro')

    if (token) {
      const profile = ctx.$auth.$storage.getCookie('profile')
      ctx.$auth.setUser(profile)
    }

    if (!seeIntro && ctx.isMobile) {
      ctx.redirect('/intro/intro-0')
    }
  }
}
