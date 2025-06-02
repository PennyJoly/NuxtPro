<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-purple-50 to-blue-50">
    <HeadNavbar />

    <main class="flex-grow flex items-center justify-center text-center px-4">
      <div class="max-w-xl">
        <h1 class="text-8xl md:text-9xl font-bold text-purple-600 mb-4 animate-pulse">404</h1>
        <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          {{ $t('error.notFoundTitle') }}
        </h2>
        <p class="text-lg md:text-xl text-gray-600 mb-10">
          {{ $t('error.notFoundMessage') }}
        </p>
        <button @click="handleError" class="bg-black text-white px-10 py-4 rounded-full relative overflow-hidden group hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
          <span class="absolute w-64 h-64 mt-12 group-hover:-rotate-45 group-hover:-mt-24 transition-all duration-500 ease-out bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"></span>
          <span class="relative group-hover:scale-110 transition-transform duration-300">{{ $t('error.goHomeButton') }}</span>
        </button>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

// It's good practice to accept the error prop, although we might not use it for a simple 404
// defineProps({
//   error: Object
// })

const { t } = useI18n();

// Function to clear the error and navigate to the homepage
const handleError = () => clearError({ redirect: '/' });

// Define i18n messages for the error page (add these to your locale files)
/* Example for en.json:
{
  "error": {
    "notFoundTitle": "Oops! Page Not Found",
    "notFoundMessage": "Looks like the page you're searching for decided to take a vacation. Let's get you back home.",
    "goHomeButton": "Go Back Home"
  }
}
*/

// Set page title for the error page
useHead({
  title: t('error.notFoundTitle')
})
</script>

<style scoped>
/* Add any specific styles for the error page if needed */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .7;
  }
}
</style> 