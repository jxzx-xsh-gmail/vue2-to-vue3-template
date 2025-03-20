<script setup lang="ts">
defineProps({
  routes: {
    type: Array as any,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.hidden && item.children">
        <router-link v-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow" :key="item.children[0].name" :to="item.path + '/' + item.children[0].path">
          <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{ 'submenu-title-noDropdown': !isNest }">
            <el-icon>
              <component :is="item.children[0].meta.icon" />
            </el-icon>
            <span v-if="item.children[0].meta && item.children[0].meta.title">
              {{ item.children[0].meta.title }}
            </span>
          </el-menu-item>
        </router-link>

        <el-sub-menu v-else :key="item.name" :index="item.name || item.path">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <span v-if="item.meta && item.meta.title">
              {{ item.meta.title }}
            </span>
          </template>
          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item v-if="child.children && child.children.length > 0" :key="child.path" :is-nest="true" class="nest-menu" :routes="[child]" />
              <router-link v-else :key="child.name" :to="item.path + '/' + child.path">
                <el-menu-item :index="item.path + '/' + child.path">
                  <span v-if="child.meta && child.meta.title">
                    {{ child.meta.title }}
                  </span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>
