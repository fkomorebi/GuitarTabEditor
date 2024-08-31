import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from '@/i18n'
// import 'amfe-flexible'
import '@/styles/index.scss'
import '@/styles/index.scss'

const app = createApp(App)
app.use(i18n)
app.mount('#app')

//取消ctrl+s
function disableCtrlS() {
  document.addEventListener('keydown', handleKeyDown);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      console.log('Ctrl+S 被阻止');
    }
  }
}

// 如果需要在某个特定元素加载完成后执行
disableCtrlS();
