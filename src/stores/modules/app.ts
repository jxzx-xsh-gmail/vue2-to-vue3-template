import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import i18n from '@/lib/lang/index'

import Cookies from 'js-cookie'

const platformList: {
  value: string
  key: string
}[] = [
  {
    key: 'fcash',
    value: 'Fast Cash',
  },
  {
    key: 'mrcash',
    value: 'Mr. Cash',
  },
  {
    key: 'kusog',
    value: 'Kusog Pera',
  },
  {
    key: 'fastpera',
    value: 'Fast Pera',
  },
  {
    key: 'snapera',
    value: 'SnaperaVIP',
  },
]
const useAppStore = defineStore('app', () => {
  const { t } = i18n.global

  const state = reactive({
    // 是否全屏
    fullscreen: sessionStorage.getItem('fullscreen') === 'true',
    breadcrumb: ['首页'],
    sidebar: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    Authority: JSON.parse(localStorage.getItem('authority') || '[]'),
    authorityID: JSON.parse(localStorage.getItem('authorityID') || '[]'),
    // 货币类型
    currencyType: localStorage.getItem('finance-data-center_currencyType') || 'CNY',
    currencySymbol: (localStorage.getItem('finance-data-center_currencyType') || 'CNY') === 'CNY' ? '¥' : '₱',
    systemCountry: 'ph',
    // 菜单缓存列表
    cachedViews: [] as string[],

    configOptions: {},
    options: {
      activeStatusOptions: [
        {
          key: 'ACTIVE',
          value: '激活',
        },
        {
          key: 'INACTIVE',
          value: '未激活',
        },
      ],
      // 汇总方式 - 切换日期组件
      summaryList: [
        {
          key: 'DAY',
          value: t('每日'),
        },
        {
          key: 'WEEK',
          value: t('每周'),
        },
        {
          key: 'MONTH',
          value: t('每月'),
        },
        {
          key: 'YEAR',
          value: t('每年'),
        },
        {
          key: 'ALL',
          value: 'ALL',
        },
      ],
      // 订单类型 - 发薪日贷/分期贷/普惠贷
      loanType: [
        {
          key: 'PAYDAY',
          value: t('overdueReport.payday'),
        },
        {
          key: 'INSTALLMENT',
          value: t('overdueReport.installment'),
        },
        {
          key: 'MINI_PAYDAY',
          value: t('overdueReport.miniPayDay'),
        },
      ],
      // 用户类型 - 首借/复借/白名单
      customerType: [
        {
          key: 'FIRST_APPLY',
          value: t('options.userType.FirstLoan'),
        },
        {
          key: 'RE_APPLY',
          value: t('options.userType.ReApplyLoan'),
        },
        {
          key: 'WHITELIST',
          value: t('options.userType.Whitelist'),
        },
      ], // 用户类型 - 首借/复借/白名单/ALL
      customerTypeWithAll: [
        {
          key: 'FIRST_APPLY',
          value: t('options.userType.FirstLoan'),
        },
        {
          key: 'RE_APPLY',
          value: t('options.userType.ReApplyLoan'),
        },
        {
          key: 'WHITELIST',
          value: t('options.userType.Whitelist'),
        },
        {
          key: 'ALL',
          value: 'ALL',
        },
      ],
      // 催收 - 订单案件类型 - 分期/非分期
      collectionOrderCase: [
        {
          key: 'INSTALLMENT',
          value: t('分期'),
        },
        {
          key: 'NOT_INSTALLMENT',
          value: t('非分期'),
        },
      ],
      // 催收 - 订单案件类型 - 分期/非分期/ALL
      collectionOrderCaseWithAll: [
        {
          key: 'INSTALLMENT',
          value: t('分期'),
        },
        {
          key: 'NOT_INSTALLMENT',
          value: t('非分期'),
        },
        {
          key: 'ALL',
          value: 'ALL',
        },
      ],
      // 首逾情况表-分期 - 二级渠道类型
      secondaryChannelType: [
        {
          key: 'whitelist_user_type',
          value: '白名单用户类型',
        },
        {
          key: 'vip_customer_channel',
          value: '优质用户类型',
        },
        {
          key: 'adjust_type',
          value: 'adjust归因渠道',
        },
      ],
      platformList,
      platformListWithAll: [
        ...platformList,
        {
          key: 'ALL',
          value: 'ALL',
        },
      ],
    },
  })

  // 是否全屏
  const setFullscreen = (fullscreen) => {
    state.fullscreen = fullscreen
    sessionStorage.setItem('fullscreen', fullscreen)
  }
  // 记录当前的title
  const setBreadcrumb = (breadcrumb) => {
    state.breadcrumb = breadcrumb
  }
  const closeSideBar = () => {
    state.sidebar = false
  }
  const toggleSideBar = () => {
    state.sidebar = !state.sidebar
    if (state.sidebar) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  }
  const setAuthority = (options) => {
    state.Authority = options
  }
  const setAuthorityID = (options) => {
    state.authorityID = options
  }
  const setOptions = (options) => {
    localStorage.setItem('setOptions', JSON.stringify(options))
    state.configOptions = options
  }

  return {
    ...toRefs(state),
    setBreadcrumb,
    setFullscreen,
    closeSideBar,
    toggleSideBar,
    setAuthority,
    setAuthorityID,
    setOptions,
  }
})

export default useAppStore
