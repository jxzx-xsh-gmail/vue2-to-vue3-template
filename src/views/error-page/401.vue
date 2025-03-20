<script setup>
const route = useRoute()
const src = ref(route.query.redirect)
</script>

<template>
  <div id="wrapper" class="error-page">
    <div class="container">
      <div class="brick"></div>
      <div class="number">
        <div class="four"></div>
        <div class="zero">
          <div class="nail"></div>
        </div>
        <div class="one"></div>
      </div>
      <div class="info">
        <h2>You do not have permission to access the page</h2>
        <p>
          The current resource is not authorized to access! If necessary, please enter the OA system to apply.
          <br />
          {{ src }}
        </p>
        <a href="/" class="btn">Back Home Page</a>
      </div>
    </div>
  </div>
</template>
