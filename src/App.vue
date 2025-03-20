<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const router = useRouter()
console.log(router)
</script>

<template>
  <el-config-provider
    :button="{
      autoInsertSpace: true,
    }"
    :locale="zhCn"
  >
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
