<script setup lang="ts">
import SideBar from '@/layouts/SideBar.vue'
import useAppStore from '@/stores/modules/app'
import HeaderBar from '@/layouts/HeaderBar.vue'
import Tabs from '@/layouts/Tabs.vue'

const route = useRoute()
const router = useRouter()
const activeMenu = ref(route.path)
const userStore = useAppStore()
const collapseMenu = () => {}
watch(
  () => route.name,
  (nV: any) => {
    if (route.meta.ignoreCache === 0 && !userStore.cachedViews.includes(nV)) {
      userStore.cachedViews.push(nV)
    }
  },
  {
    immediate: true,
  }, // 立即触发一次监听
)
watch(
  () => route.path,
  (nV: any) => {
    activeMenu.value = nV
  },
)

// 初始化：根据路由配置预加载需要缓存的页面
onMounted(() => {
  const initialCacheRoutes = router
    .getRoutes()
    .filter((r) => r.meta.ignoreCache === 0)
    .map((r) => r.name as string)
  userStore.cachedViews = [...new Set(initialCacheRoutes)] // 去重
})
</script>

<template>
  <el-container>
    <el-aside
      v-show="!userStore.fullscreen"
      id="side-bar"
      :style="{
        width: !userStore.sidebar ? '44px' : '225px',
      }"
    >
      <side-bar :active-index="activeMenu" @collapse="collapseMenu" />
    </el-aside>
    <el-container id="main-container">
      <el-header v-show="!userStore.fullscreen" id="header-bar">
        <header-bar />
      </el-header>
      <Tabs />
      <el-main id="main-bar">
        <div id="main-inner">
          <router-view v-slot="{ Component }">
            <keep-alive :include="userStore.cachedViews">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </el-main>
      <el-backtop target="#main-bar" :bottom="18" :right="10" />
    </el-container>
  </el-container>
</template>

<style scoped></style>
