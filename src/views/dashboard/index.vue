<script setup lang="ts">
const value = new Date()
</script>

<template>
  <div>
    <div class="view-init">
      <el-calendar v-model="value" />
    </div>
  </div>
</template>
