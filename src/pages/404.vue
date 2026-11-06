<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

</script>

<template>
   <div>
        <el-result icon="warning" title="404" sub-title="The page you visited does not exist">
            <template #extra>
                <el-button type="primary" @click="$router.push('/login')">Back</el-button>
            </template>
        </el-result>

    </div>
        
 

</template>

    <style scoped></style>