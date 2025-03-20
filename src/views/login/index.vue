<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">登录</h1>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" size="large" style="width: 100%" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus'
import { useRouter } from 'vue-router' // 补充导入useRouter

const router = useRouter()
const loginFormRef = ref<InstanceType<typeof ElForm>>()
const loginForm = ref({
  username: '',
  password: '',
})
const loginRules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    await loginFormRef.value?.validate()
    router.push('/dashboard/index')
    // console.log('登录成功', loginForm.value)
    // 这里可以添加实际的登录逻辑
  } catch (error) {
    console.error('登录失败', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://picsum.photos/1920/1080'); /* 随机背景图片 */
  background-size: cover;
  background-position: center;
  position: relative;
  /* 添加渐变遮罩 */
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://picsum.photos/1920/1080');
}

.login-box {
  width: 360px;
  padding: 10px 40px 40px 40px;
  background-color: rgba(255, 255, 255, 0.2); /* 设置半透明背景颜色 */
  border-radius: 20px; /* 增加圆角 */
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25); /* 增加阴影 */
  z-index: 2;
  backdrop-filter: blur(20px); /* 增加磨砂质感 */
  transition: transform 0.3s ease; /* 添加过渡效果 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 添加边框 */
  animation: fadeInUp 0.5s ease-out; /* 添加淡入上滑动画 */
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-box:hover {
  transform: scale(1.03); /* 鼠标悬停时放大 */
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3); /* 鼠标悬停时增加阴影 */
}

.login-title {
  margin-bottom: 20px;
  text-align: center;
  font-size: 36px; /* 增大字体 */
  font-weight: 800; /* 增加字体粗细 */
  color: #fff; /* 白色字体 */
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.25); /* 添加文字阴影 */
  letter-spacing: 2px; /* 增加字母间距 */
  animation: fadeIn 0.5s ease-out; /* 添加淡入动画 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 设置输入框背景色为透明磨砂 */
.el-input__inner {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 10px; /* 增加输入框圆角 */
  color: #fff; /* 白色字体 */
  padding: 14px 18px; /* 增加内边距 */
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease; /* 添加过渡效果 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加输入框阴影 */
}

.el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.6); /* 调整占位符颜色 */
}

.el-input__inner:hover {
  background-color: rgba(255, 255, 255, 0.3); /* 鼠标悬停时背景色变化 */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* 鼠标悬停时增加阴影 */
}

.el-input__inner:focus {
  background-color: rgba(255, 255, 255, 0.4); /* 聚焦时背景色变化 */
  outline: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* 聚焦时增加阴影 */
}

/* 按钮样式 */
.el-button {
  border-radius: 10px; /* 增加按钮圆角 */
  padding: 14px; /* 增加内边距 */
  font-size: 18px; /* 增大字体 */
  font-weight: 700; /* 增加字体粗细 */
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease; /* 添加过渡效果 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加按钮阴影 */
  background-color: #007bff; /* 设置按钮默认背景色 */
  color: #fff; /* 设置按钮文字颜色 */
}

.el-button:hover {
  background-color: #0056b3; /* 鼠标悬停时背景色变化 */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* 鼠标悬停时增加阴影 */
}

.el-button:disabled {
  background-color: #6c757d; /* 禁用时背景色 */
  cursor: not-allowed;
}
</style>
