<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginAPI } from '@/api/userApi'
import { ElNotification } from 'element-plus'
import { messageOpen } from '@/utils/notify'
import Cookies from 'js-cookie'


const router = useRouter()
const loginForm = reactive({
    email: '',
    password: ''
})
const refForm = ref(null)

const rules= {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    password:[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ]
}



const handleLogin = async() => {
    // 此处可添加表单校验与登录请求逻辑
    console.log('登录信息：', loginForm)
    try{
        const res =await loginAPI(loginForm)
        // console.log('res',res);
        if(res.status===200){
            Cookies.set('access_token', res.data.access_token, { expires: 0.1 })
            console.log('res.message',res.data.message);
            router.push('/home')
            messageOpen('success',res.data.message)
        }
            
    } catch (err){
        console.log('err',err);
        messageOpen('error',err)
    
    }
   
}


const submitForm = () => {
    refForm.value.validate((valid) => {
        if (valid) {
            handleLogin()
        } else {
            console.log('error submit!!')
            return false
        }
    })
}
</script>

<template>
    <div class="login-container">
        <el-row class="login-row" type="flex" justify="center" align="middle">
            <!-- 左侧图像区域 -->
            <el-col :span="12" class="left-side">
                <img src="@/assets/vite.svg" alt="Login Image" class="login-image" />
            </el-col>

            <!-- 右侧表单区域 -->
            <el-col :span="12" class="right-side">
                <div class="form-wrapper">
                    <h2 class="title">系统登录</h2>
                    <el-form ref="refForm" :rules="rules" :model="loginForm" label-position="top">
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="loginForm.email" placeholder="请输入 Email"  clearable>
                                <template #prefix>
                                   <el-icon>
                                        <User />
                                    </el-icon>
                                </template>
                            </el-input>

                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"
                                show-password>
                                <template #prefix>
                                    <el-icon>
                                        <Lock />
                                    </el-icon>
                                </template>
                            </el-input>


                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="login-btn" @click="submitForm">
                                登 录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.login-container {
    height: 100vh;
    background-color: #f5f7fa;
}

.login-row {
    height: 100%;
}

.left-side {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4d9450;
    height: 100%;
}

.login-image {
    width: 60%;
    max-width: 400px;
    height: auto;
}

.right-side {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #ffffff;
}

.form-wrapper {
    width: 70%;
    max-width: 350px;
}

.title {
    text-align: center;
    margin-bottom: 30px;
    color: #303133;
}

.login-btn {
    width: 100%;
    margin-top: 10px;
}
</style>
