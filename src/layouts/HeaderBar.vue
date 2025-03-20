<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useAppStore from '@/stores/modules/app'
import avatarSrc from '/vite.svg'

const userStore = useAppStore()
const i18n = useI18n()
const userName = computed(() => {
  return 'Admin'
})
const breadcrumb = computed(() => {
  const res = userStore.breadcrumb
  res[0] = i18n.t(res[0])
  return res
})
const router = useRouter()
const route = useRoute()

const state = reactive({
  src: avatarSrc,
  pending: true,
  language: '',
  langs: [
    {
      code: 'zh_cn',
      name: '中文',
    },
    {
      code: 'en_ph',
      name: 'English(PH)',
    },
  ],
  curapp: '',
  isShowRefresh: Boolean(window.location.port), // 开发环境才显示
})
// 在编辑器中打开页面源码
const openSourceCode = () => {
  const pathParts = route.path.split('/').slice(2) // 将路由路径拆分并移除前两部分
  const dynamicPath = `src/views/${pathParts.join('/')}.vue`
  fetch(`__open-in-editor?file=${dynamicPath}`)
}
const accountCommand = (command) => {
  if (command === 'signOut') {
    signOut()
  } else if (command === 'refreshMenu') {
    refreshMenu()
  }
}
const signOut = () => {
  router.replace({
    path: '/login',
  })
}
const refreshMenu = () => {
  userStore.cachedViews = userStore.cachedViews.filter((item) => item !== route.name)
  nextTick(() => {
    router.replace({
      path: `/redirect${route.fullPath}`,
    })
  })
}
</script>

<template>
  <div>
    <el-breadcrumb id="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="state.isShowRefresh" class="icon-box" @click="openSourceCode">
      <el-icon class="header-icon" title="在编辑器中打开页面源码">
        <FolderOpened />
      </el-icon>
    </div>
    <div class="icon-box" @click="refreshMenu">
      <el-icon class="header-icon" title="刷新当前页面">
        <Refresh />
      </el-icon>
    </div>
    <div id="header-nav">
      <ul>
        <li>
          <el-dropdown class="header-dropdown last" trigger="click" @command="accountCommand">
            <span class="flex user-box">
              <el-image :src="state.src" class="avatar">
                <template #placeholder>
                  <div class="image-slot">
                    {{ $t('el.select.loading') }}
                    <span class="dot">...</span>
                  </div>
                </template>
              </el-image>
              <span class="p-x-10 pointer">hi! {{ userName }}</span>
              <el-icon class="pointer">
                <ArrowDown />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="signOut">退出账号</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
#header-bar {
  .shortcut-icon {
    line-height: 60px;
    margin-left: 20px;
    font-size: 20px;
    color: dodgerblue;
    cursor: pointer;
  }
}

.icon-box {
  display: inline-block;
  margin-left: 2px;
  padding: 7px 7px 5px 7px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #e1e1e1;
  }

  .header-icon {
    font-size: 18px;
  }
}

.user-box {
  height: 50px;
}
</style>
