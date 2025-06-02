<template>
  <nav class="bg-white shadow fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <img src="/assets/imgs/icon/nuxtpro.png" alt="NuxtPro Logo" class="w-12 h-12"/>
              <h1 class="ml-2 text-xl font-bold">NuxtPro</h1>
            </NuxtLink>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink 
              v-for="item in displayMenuItems" 
              :key="item.path"
              :to="item.path"
              :class="[
                'border-b-2 inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300',
                activeMenuItem === (item.path.startsWith('/#') ? item.path.substring(1) : item.path)
                  ? 'border-black text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              ]"
              @click="setActiveMenuItem(item.path)"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>

       
        
        <!-- 修改用户信息区域 -->
        <div class="flex items-center space-x-4">
          <!-- 移动端汉堡菜单按钮 -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
          >
            <span class="sr-only">Open main menu</span>
            <!-- 使用简单的汉堡菜单图标 -->
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="relative" ref="dropdownContainer">
            <div class="flex items-center space-x-3">
              <span v-if="session.data?.user" class="text-sm text-gray-700 hidden sm:block">{{ session.data?.user.name }}</span>
              <button 
                v-if="session.data?.user"
                class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                @click="toggleDropdown"
              >
                <img
                  class="h-8 w-8 rounded-full object-cover"
                  :src="session.data?.user.image || '/default-avatar.png'"
                  alt="User avatar"
                />
              </button>
              <button
                v-else
                @click="openLoginModal"  
                class="text-gray-700 hover:text-gray-900 font-medium text-sm"
              >
              {{ $t('home.loginButton') }}
              </button>
            </div>
            
            <!-- 用户下拉菜单 -->
            <div v-if="isDropdownOpen && session.data?.user" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
              <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                <div class="font-medium">{{ session.data?.user.name }}</div>
                <div class="text-gray-500">{{ session.data?.user.email }}</div>
              </div>
              <!-- <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</NuxtLink> -->
              <button 
                @click="handleSignOut" 
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>

          <!-- 移动语言切换器到这里 -->
          <div class="hidden sm:block border-l pl-4">
            <Select v-model="currentLocale" :options="localeOptions" @update:model-value="switchLanguage">
              <SelectTrigger class="w-[120px]">
                <SelectValue :placeholder="$t('common.selectLanguage')" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="locale in localeOptions" :key="locale.value" :value="locale.value">
                  {{ locale.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div 
        v-show="isMobileMenuOpen" 
        class="sm:hidden"
      >
        <div class="pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="item in displayMenuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300',
              activeMenuItem === (item.path.startsWith('/#') ? item.path.substring(1) : item.path)
                ? 'border-black text-black bg-gray-50'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            ]"
            @click="setActiveMenuItem(item.path)"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        <!-- 移动端语言切换器 -->
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="px-4">
            <Select v-model="currentLocale" :options="localeOptions" @update:model-value="switchLanguage">
              <SelectTrigger class="w-full">
                <SelectValue :placeholder="$t('common.selectLanguage')" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="locale in localeOptions" :key="locale.value" :value="locale.value">
                  {{ locale.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  
      <!-- Login Modal -->
  <div v-if="isLoginModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-60 flex items-center justify-center" @click.self="closeLoginModal">
    <div class="relative mx-auto p-6 border w-96 shadow-lg rounded-md bg-white">
      <button @click="closeLoginModal" class="absolute top-2 right-2 p-1 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <div class="mt-3 text-center">
        <div class="flex justify-center items-center mb-4">
          <img src="/assets/imgs/icon/nuxtpro.png" alt="NuxtPro Logo" class="w-8 h-8 mr-2"/>
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ $t('auth.selectLoginMethod') }}</h3>
        </div>
         <p class="text-sm text-gray-500 mb-4">{{ $t('auth.selectLoginMethodDescription') }}</p>
        <div class="mt-2 px-7 py-3 space-y-3">
          <button @click="triggerGoogleSignIn" class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <img src="/assets/imgs/icon/google.png" alt="Google logo" class="w-5 h-5 mr-2"/>
            <span class="ml-2">Sign in with Google</span>
          </button>
          <button @click="triggerGithubSignIn" class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <img src="/assets/imgs/icon/github.png" alt="GitHub logo" class="w-5 h-5 mr-2"/>
            <span class="ml-2">Sign in with Github</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  </nav>
</template>

<script lang="ts" setup>
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components'
//import { useLogtoUser } from '#imports'
import { useRuntimeConfig } from '#app'
import { googleSignIn,githubSignIn,useSession,signOut } from '~/lib/auth/auth-client'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#imports'

const session  = useSession()
const user = ref(null);
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl || '';

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// 先声明 currentLocale
const currentLocale = useState('locale', () => locale.value)
const activeMenuItem = ref('')

// 定义语言选项
const localeOptions = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' },
  { value: 'JP', label: '日本語' }
]

// 切换语言方法
const switchLanguage = async (newLocale: string) => {
  currentLocale.value = newLocale
  locale.value = newLocale
  localStorage.setItem('userLocale', newLocale)
  
  const path = switchLocalePath(newLocale)
  if (path) {
    await router.push({
      path,
      hash: route.hash,
      query: route.query
    })
  }
}

// setActiveMenuItem 方法
const setActiveMenuItem = async (path: string) => {
  const targetPath = path.startsWith('/#') ? path.substring(1) : path
  activeMenuItem.value = targetPath
  
  // 构建目标路径，保持当前语言
  const currentPath = path.startsWith('/') ? path : '/' + path
  const targetLocale = currentLocale.value
  const localePrefix = targetLocale === 'en-US' ? '' : `/${targetLocale}`;
  const basePathForHash = targetLocale === 'en-US' ? '/' : `/${targetLocale}/`;
  const finalPath = path.startsWith('/#') ? `${basePathForHash}${path.substring(1)}` : `${localePrefix}${currentPath}`;

  // 如果是锚点链接，使用 window.location.hash + push('/') 或 router.push({ path: '/', hash: ... })
  if (path.startsWith('/#')) {
    const hash = path; // 包含 '#'
    // 导航到根路径并附加哈希值
    await router.push({ path: localePrefix || '/', hash: hash });
  } else {
    await router.push(finalPath)
  }
  isMobileMenuOpen.value = false
}

// 路由监听
watch(
  () => route.fullPath,
  async (newPath) => {
    // 更新活动菜单项
    if (route.hash) {
      activeMenuItem.value = route.hash
    } else {
      activeMenuItem.value = route.path
    }

    // 确保语言设置正确
    const routeLocale = route.params.locale || 'en-US'
    if (routeLocale !== currentLocale.value) {
      // 如果 URL 中的语言与当前语言不匹配，更新路由到正确的语言版本
      const path = switchLocalePath(currentLocale.value)
      if (path) {
        await router.push({
          path,
          hash: route.hash,
          query: route.query
        })
      }
    }
  },
  { immediate: true }
)

// 组件挂载时的处理
onMounted(() => {
  // 从 URL 或 localStorage 恢复语言设置
  const savedLocale = localStorage.getItem('userLocale') || currentLocale.value
  if (savedLocale) {
    currentLocale.value = savedLocale
    locale.value = savedLocale
  }

  // 在外部点击时关闭下拉菜单
  document.addEventListener('click', handleClickOutside);
})

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 获取用户信息
//const user = useLogtoUser()
const isDropdownOpen = ref(false)

// 切换下拉菜单
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}



// 点击外部处理程序需要访问下拉菜单元素的 ref
const dropdownContainer = ref<HTMLElement | null>(null); // 定义 ref

const handleClickOutside = (event: MouseEvent) => {
  // 检查点击事件的目标是否在 dropdownContainer 元素内部
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    isDropdownOpen.value = false; // 如果点击在外部，则关闭下拉菜单
  }
};

// 根据登录状态动态显示菜单项
const displayMenuItems = computed(() => {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'FAQ', path: '/#faq' },
    { name: 'Roadmap', path: '/roadmap' }
    //{ name: 'Friend', path: '/#friend' }
  ]

  // 确保 user 存在且有 value 属性
  // if (user?.value) {
  //   // 用户已登录，不显示登录菜单项
  //   return menuItems.filter(item => item.path !== '/login')
  // }
  // 用户未登录，添加登录菜单项
  return menuItems;
})

// 处理登出
const handleSignOut = async () => {
  try{
    const res = await signOut();
    console.log("signOut res:", res);
    isDropdownOpen.value = false;
    if(res.data?.success === true){
      window.location.href ='/'
    }
  }catch(error){
    console.error("signOut error:", error);
  }
}

// Login Modal State
const isLoginModalOpen = ref(false);

// --- Modal Functions ---
const openLoginModal = () => {
  isLoginModalOpen.value = true;
};

const closeLoginModal = () => {
  isLoginModalOpen.value = false;
};

const triggerGoogleSignIn = async () => {
  closeLoginModal(); // Close modal before initiating sign-in
  await handleGoogleSignIn();
};

const triggerGithubSignIn = async () => {
  closeLoginModal(); // Close modal before initiating sign-in
  await handleGithubSignIn();
};

// --- Existing Auth Functions ---
// Handle Google Sign In (Keep existing implementation)
const handleGoogleSignIn = async () => {
  try {
    await googleSignIn();
    // console.log('Google sign-in initiated');
  } catch (error) {
    console.error("google login error:", error);
  }
};

// Handle GitHub Sign In (Keep existing implementation)
const handleGithubSignIn = async () => {
  try {
    await githubSignIn();
    // console.log('GitHub sign-in initiated');
  } catch (error) {
    console.error("github login error:", error);
  }
};
</script>

<style>
/* 确保内容不会被固定导航栏遮挡 */
body {
  padding-top: 64px; /* 与导航栏高度匹配 */
}

/* 确保导航栏固定且始终可见 */
nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 50;
}

/* 确保下拉内容在移动端正确显示 */
.select-content {
  z-index: 51; /* 比导航栏更高的 z-index */
  position: relative;
}

/* 确保移动端菜单在滚动时保持可见 */
.sm\:hidden {
  position: relative;
  background-color: white;
}

/* Ensure modal is above everything */
.z-60 { z-index: 60; } 
</style>