<script setup lang="ts">
import useAppStore from '@/stores/modules/app'

const route = useRoute()
const router = useRouter()
const userStore = useAppStore()

const activeTab = ref(route.path)

// 是否默认保留
const isHome = (path: string) => {
  return path === '/dashboard/index'
}
watch([() => route.path, () => route.meta.title, () => route.meta.hiddenTabs], (nV) => {
  const [path, title, hiddenTabs] = nV
  // 可设置不在tabs中显示
  if (hiddenTabs) return
  activeTab.value = path
  addTab({
    title,
    path,
  })
})
const defaultRoute = {
  title: '首页',
  path: '/dashboard/index',
}
const tabList = ref([defaultRoute])

const refreshMenu = () => {
  localStorage.removeItem('router')
  router.go(0)
}

const handleCommand = (command: string | number | object, path: string, index: number) => {
  switch (command) {
    case 'now':
      removeTab(path)
      break
    case 'other':
      tabList.value = tabList.value.filter((e) => e.path === path || isHome(e.path))
      if (path !== activeTab.value) {
        jumpPath(path)
      }
      activeTab.value = path
      break
    case 'left': {
      const list = tabList.value.slice(index, tabList.value.length)
      const isHave = list.findIndex((e) => e.path === activeTab.value)
      const isHaveDashboard = list.findIndex((e) => isHome(e.path))
      if (isHaveDashboard === -1) {
        list.unshift(defaultRoute)
      }
      if (isHave === -1) {
        activeTab.value = list[0].path
        jumpPath(activeTab.value)
      }
      tabList.value = list
      break
    }
    case 'right': {
      tabList.value = tabList.value.slice(0, index + 1)
      const isHave = tabList.value.findIndex((e) => e.path === activeTab.value)
      if (isHave === -1) {
        activeTab.value = tabList.value[tabList.value.length - 1].path
        jumpPath(activeTab.value)
      }
      break
    }
    case 'all': {
      tabList.value = [defaultRoute]
      activeTab.value = defaultRoute.path
      jumpPath(activeTab.value)
      break
    }
  }
  saveTabList()
}

// 点击标签跳转指定路由
function tabChange(path) {
  router.push(path)
  activeTab.value = path
}

// 添加标签导航
function addTab(tab) {
  const notTab = tabList.value.findIndex((e) => e.path === tab.path) === -1
  if (notTab) {
    tabList.value.push(tab)
  }
  saveTabList()
}

// 缓存tabList
const saveTabList = () => {
  sessionStorage.setItem('tabList', JSON.stringify(tabList.value))
}

// 初始化tabList
function initTabList() {
  const data = sessionStorage.getItem('tabList')
  if (data) {
    tabList.value = JSON.parse(data)
  }
}

initTabList()

// 跳转路由
const jumpPath = (path) => {
  nextTick(() => {
    router.push(path)
  })
}

// 删除tab
const removeTab = (currentTab) => {
  const tabs = tabList.value
  let a = activeTab.value
  // 如果当前路径和你要删除的路径一致
  if (currentTab === a) {
    tabs.forEach((tab, index) => {
      // 要删除的路径和tabList的路径匹配
      if (tab.path === currentTab) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        // 如果存在，获取nextTab路径
        if (nextTab) {
          a = nextTab.path
          jumpPath(a)
        }
      }
    })
  }
  // 重新赋值activeTab
  activeTab.value = a
  // 过滤删除后的tabList
  tabList.value = tabList.value.filter((tab) => tab.path !== currentTab)
  saveTabList()
}
</script>

<template>
  <div class="tabs">
    <el-tabs v-model="activeTab" class="tabs-box" type="card" @tab-change="tabChange" @tab-remove="removeTab">
      <el-tab-pane v-for="(item, index) in tabList" :key="item.path" :label="item.title" :name="item.path" :closable="!isHome(item.path)">
        <template #label>
          <el-dropdown trigger="contextmenu" placement="bottom" @command="handleCommand($event, item.path, index)">
            <span>{{ item.title }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="!isHome(item.path)" command="now"> 关闭当前 </el-dropdown-item>
                <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                <el-dropdown-item command="left">关闭左侧</el-dropdown-item>
                <el-dropdown-item command="right">关闭右侧</el-dropdown-item>
                <el-dropdown-item command="all">关闭全部</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="icon-box" @click="refreshMenu">
      <el-icon class="header-icon">
        <RefreshRight />
      </el-icon>
    </div>
    <div class="icon-box" @click="userStore.setFullscreen(!userStore.fullscreen)">
      <el-icon class="header-icon">
        <Minus v-show="userStore.fullscreen" />
        <FullScreen v-show="!userStore.fullscreen" />
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
.tabs {
  display: flex;
  align-items: center;
  background: white;
  padding-right: 5px;
  border-bottom: 1px solid #eee;
}

.tabs-box {
  flex: 1;
  width: calc(100% - 80px);
}

.icon-box {
  display: inline-block;
  padding: 5px 5px 3px 5px;
  border-radius: 4px;
  cursor: pointer;
  border-left: 1px solid #eee;

  &:hover {
    background: #e1e1e1;
  }

  .header-icon {
    font-size: 18px;
  }
}
</style>
