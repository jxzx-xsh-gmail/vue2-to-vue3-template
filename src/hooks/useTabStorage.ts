// hooks/useTabStorage.ts

interface TabStorageOptions {
  // 是否需要权限
  isAuth: boolean
  // 默认选中的tab
  defaultTab?: string
  // 权限配置
  tabsPermission?: Record<string, string>
}

const defaultOptions: TabStorageOptions = {
  isAuth: true,
  defaultTab: '',
  tabsPermission: {},
}

export function useTabStorage(storageKey: string, config = defaultOptions) {
  const tabStorage = 'PageTabObj'
  // 获取默认选中的tab
  const getDefault = () => {
    if (config.isAuth) {
      return config.tabsPermission || ''
    } else {
      return config.defaultTab || ''
    }
  }
  const activeName = ref(getDefault())
  // 从存储中恢复状态
  const initFromStorage = () => {
    const tabObj = JSON.parse(sessionStorage.getItem(tabStorage) || '{}')
    // 需要权限验证
    if (config.isAuth && tabObj[storageKey] && config.tabsPermission && config.tabsPermission[tabObj[storageKey]]) {
      activeName.value = tabObj[storageKey]
    }
    // 不需要权限
    if (!config.isAuth && tabObj[storageKey]) {
      activeName.value = tabObj[storageKey]
    }
  }

  // 初始化时尝试读取存储
  initFromStorage()

  // 监听变化保存状态
  watch(activeName, (nV) => {
    setTabStorage(storageKey, nV as string)
  })

  // 保存状态
  const setTabStorage = (storageKey: string, storageValue: string) => {
    const tabObj = JSON.parse(sessionStorage.getItem(tabStorage) || '{}')
    sessionStorage.setItem(tabStorage, JSON.stringify({ ...tabObj, [storageKey]: storageValue }))
  }
  // 获取状态
  const getTabStorage = (storageKey: string) => {
    const tabObj = JSON.parse(sessionStorage.getItem(tabStorage) || '{}')
    return tabObj[storageKey]
  }

  return {
    activeName,
    initFromStorage,
    getTabStorage,
    setTabStorage,
  }
}
