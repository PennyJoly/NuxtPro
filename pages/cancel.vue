<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto px-4 py-8 text-center">
      <h1 class="text-3xl font-bold mb-4 text-red-600">Order Cancelled</h1>
      <div class="bg-white bg-opacity-80 rounded-lg p-6 shadow-md">
        <p class="mb-4">
          Your order has been cancelled. We're sorry to see you go.
        </p>
        <p class="mb-4">
          If you have any questions or would like to provide feedback, please don't hesitate to contact us:
        </p>
        <a href="mailto:victor.long.cheng@gmail.com" class="text-blue-600 hover:underline">
          xxx@gmail.com
        </a>
      </div>
      <div class="mt-12 text-center">
        <NuxtLink :to="localePath('index')" class="text-blue-500 hover:underline">{{ $t('back_to_home') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
useHead({
  title: 'your product name',
  meta: [
    { name: 'description', content: 'your product description' },
   ],
})

// 添加自动跳转功能
onMounted(() => {
  setTimeout(() => {
    navigateTo(localePath('index'))
  }, 5000)
})
</script>