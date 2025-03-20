<template>
  <div>
    <h1>测试页面2</h1>
    <!-- 输入框，绑定输入值到 message 数据 -->
    <input v-model="message" placeholder="请输入内容" />
    <!-- 显示输入的内容 -->
    <p>你输入的内容是: {{ message }}</p>
    <!-- 点击按钮触发 changeMessage 方法 -->
    <button @click="changeMessage">改变内容</button>
  </div>
</template>

<script>
export default {
  name: 'TestPage2',
  data() {
    return {
      message: '初始内容',
    }
  },
  methods: {
    changeMessage() {
      this.message = '内容已改变'
    },
  },
}
</script>

<style scoped>
h1 {
  color: #333;
}
p {
  color: #666;
}
button {
  margin-top: 10px;
}
</style>
