<script setup>

import Cookies from 'js-cookie'
import { loginCurrentInfo } from '@/api/userApi'
import { ref, onMounted } from 'vue'
import { messageOpen, messageShow } from '@/utils/notify'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const userInfo = ref(null)

const fetchUserInfo = async () => {
  // 此处可添加表单校验与登录请求逻辑
  console.log('登录信息：',)
  try {
    const res = await loginCurrentInfo()


    // console.log('res',res);
    userInfo.value = res.data

  } catch (err) {
    console.log('err', err);
    messageOpen('error', err)

  }

}

const logout = async () => {
  try {
    await messageShow('warning', '确定要退出登录吗？', '提示')

    console.log('logout success')
    Cookies.remove('access_token')
    router.push('/login')



    // 清除本地存储的用户信息


  }
  catch (err) {
    // 屏蔽用户点击取消的正常行为
    if (err === 'cancel' || err === 'close') return
    messageOpen('error', err)
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<template>
  <el-container class="layout-container">
    <!-- Header 区域 -->
    <el-header class="header">
      <h2>管理系统</h2>
      
      <el-button type="danger" @click="logout">{{ userInfo?.username }}退出登录</el-button>
    </el-header>

    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px" class="aside">
        <!-- :default-active 保证高亮当前路由，router属性使点击菜单项自动跳转 -->
        <el-menu :default-active="route.path" router class="aside-menu">
         

          <el-menu-item index="/dashboard">
            <el-icon>
              <Odometer />
            </el-icon>
            <span>看板</span>
          </el-menu-item>



          <el-menu-item index="/settings">
            <el-icon>
              <Setting />
            </el-icon>
            <span>设置</span>
          </el-menu-item>
          
        </el-menu>
      </el-aside>

      <!-- Main 主页区域 -->
      <el-main class="main-content">
        <!-- 子路由将在此处渲染 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #545c64;
  color: #fff;
}
.aside {
  background-color: #f5f7fa;
  border-right: 1px solid #e6e6e6;
}
.menu-link {
  text-decoration: none; /* 去除 router-link 默认下划线 */
}
.main-content {
  background-color: #fff;
  padding: 20px;
}
</style>