<script setup lang="ts">
const router = useRouter()
const route = useRoute()
router.replace({
  path: `/${route.params.path}`,
  query: route.query,
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
