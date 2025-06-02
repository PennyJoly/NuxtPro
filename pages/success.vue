<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
    <div class="container mx-auto px-4 py-8 text-center">
      <!-- 成功图标动画 -->
      <div class="mb-6 success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>

      <h1 class="text-4xl font-bold mb-4 text-green-600 animate-bounce">
        {{ $t('order_successful') }}
      </h1>
      
      <div class="bg-white bg-opacity-90 rounded-lg p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
        <p class="mb-4 text-lg">
          {{ $t('thank_you_order') }}
        </p>
        <!-- 添加一些积分奖励信息 -->
        <div class="mt-4 p-4 bg-green-50 rounded-lg">
          <p class="text-green-700">
            <span class="font-bold">🎉 {{ $t('Good luck~') }}</span>
          </p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <NuxtLink 
          :to="localePath('index')" 
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300"
        >
          <span class="mr-2">{{ $t('back_to_home') }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>

      <!-- 倒计时提示 -->
      <div class="mt-4 text-sm text-gray-600">
        {{ $t('auto_redirect') }} {{ countdown }} {{ $t('seconds') }}
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const countdown = ref(5)

// 倒计时功能
onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      navigateTo(localePath('index'))
    }
  }, 1000)
})

useHead({
  title: t('order_successful'),
  meta: [
    { name: 'description', content: t('order_successful_desc') },
  ],
})
</script>

<style scoped>
/* 成功打勾动画样式 */
.success-checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #4CAF50;
}

.check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}

.check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 4.25s ease-in;
}

.icon-line {
  height: 5px;
  background-color: #4CAF50;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}

.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 0.75s;
}

.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 0.75s;
}

.icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(76, 175, 80, .5);
}

.icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: #ffffff;
}

@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}

@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
</style>