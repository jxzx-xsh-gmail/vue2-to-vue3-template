<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import useAppStore from '@/stores/modules/app'
// import { useI18n } from 'vue-i18n'

// const i18n = useI18n()
const userStore = useAppStore()
defineProps({
  activeIndex: {
    type: String,
  },
})

const switchCollapse = () => {
  useAppStore().toggleSideBar()
}

const routes = computed(() => {
  return [
    {
      name: 'dashboard',
      path: '/dashboard',
      meta: {
        title: '控制台',
        icon: 'DHomeFilled',
      },
      children: [
        {
          name: 'index',
          path: 'index',
          meta: {
            title: '控制台',
            icon: 'Menu',
          },
        },
      ],
    },

    {
      name: 'test',
      path: '/test',
      meta: {
        title: '测试页面',
        icon: 'FolderRemove',
      },
      children: [
        {
          name: 'test-1',
          path: 'test-1',
          meta: {
            title: '测试页面-1',
          },
        },
        {
          name: 'test-2',
          path: 'test-2',
          meta: {
            title: '测试页面-2',
          },
        },
      ],
    },
    {
      name: 'error',
      path: '',
      meta: {
        title: '错误页面',
        icon: 'DocumentDelete',
      },
      children: [
        {
          name: '401',
          path: '401',
          meta: {
            title: '401',
          },
        },

        {
          name: '404',
          path: '404',
          meta: {
            title: '404',
          },
        },
      ],
    },
  ]
  // const r = JSON.parse(localStorage.getItem('antRouter') || '[]')
  // if (r && r.length > 0) {
  //   r[0].children[0].meta.title = i18n.t(r[0].children[0].meta.title)
  // }
  // return r
})
</script>

<template>
  <div>
    <div id="logo" :class="{ isCollapse: !userStore.sidebar }">
      <h1 v-show="userStore.sidebar">
        <router-link to="/dashboard/index" style="color: black; white-space: nowrap"> Vue2ToVue3Template </router-link>
      </h1>
      <el-icon v-show="!userStore.sidebar" @click="switchCollapse()">
        <DArrowLeft />
      </el-icon>
      <el-icon v-show="userStore.sidebar" @click="switchCollapse()">
        <DArrowRight />
      </el-icon>
    </div>
    <el-menu id="side-menu" popper-effect="light" :collapse-transition="false" :default-active="activeIndex" :collapse="!userStore.sidebar">
      <sidebar-item :routes="routes" />
    </el-menu>
  </div>
</template>

<style lang="less">
#logo {
  height: 50px;
  position: relative;
  overflow: hidden;

  .el-icon {
    margin-top: -2px;
    width: 40px;
    height: 50px;
    cursor: pointer;
  }
}
</style>
