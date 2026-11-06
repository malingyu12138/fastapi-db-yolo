import { ElNotification,ElMessageBox } from 'element-plus'

const messageOpen=async(type,content)=> {
  ElNotification({
    title: `${type || 'Default'} progress`,
    message: content || '',
    type: type,
    duration: 6000,
    progress: true,
  })
}

const messageShow=async(type,content,title="")=> {
  

  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: type,
    }
  )
 
}
export {
  messageOpen,
  messageShow
}