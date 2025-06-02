<template>
  <footer class="bg-gradient-to-r from-purple-50 to-blue-50 text-gray-700 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">

        <div class="col-span-2 md:col-span-1">
          <a href="#" class="flex items-center mb-4 text-gray-900 text-xl font-semibold">
            <img src="/assets/imgs/icon/nuxtpro.png" alt="NuxtPro Logo" class="h-12 w-auto mr-2">
            NuxtPro
          </a>
          <a href="https://nuxtpro.com" target="_blank" class="inline-flex items-center text-xs bg-white/60 hover:bg-white/80 text-gray-800 px-2 py-1 rounded">
            Built with 🚀 NuxtPro
          </a>
        </div>

        <div>
          <h5 class="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">{{ $t('footer.menu') }}</h5>
          <ul class="space-y-2">
            <li><NuxtLink to="#" class="hover:text-black">{{ $t('footer.home') }}</NuxtLink></li>
            <li><NuxtLink to="#features" class="hover:text-black">{{ $t('footer.features') }}</NuxtLink></li>
            <li><NuxtLink to="#pricing" class="hover:text-black">{{ $t('footer.pricing') }}</NuxtLink></li>
            <li><NuxtLink to="#testimonials" class="hover:text-black">{{ $t('footer.testimonials') }}</NuxtLink></li>
            <li><NuxtLink to="#faq" class="hover:text-black">{{ $t('footer.faq') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h5 class="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">{{ $t('footer.resources') }}</h5>
          <ul class="space-y-2">
            <li><NuxtLink to="blog" class="hover:text-black">{{ $t('footer.blog') }}</NuxtLink></li>
            <li><NuxtLink to="roadmap" class="hover:text-black">{{ $t('footer.roadmap') }}</NuxtLink></li>
            <!-- <li><NuxtLink to="/docs" class="hover:text-black">{{ $t('footer.documentation') }}</NuxtLink></li>
            <li><NuxtLink to="/changelog" class="hover:text-black">{{ $t('footer.changelog') }}</NuxtLink></li> -->
          </ul>
        </div>

        <div>
          <h5 class="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">{{ $t('footer.legal') }}</h5>
          <ul class="space-y-2">
            <!-- <li><NuxtLink to="/license" class="hover:text-black">{{ $t('footer.license') }}</NuxtLink></li>
            <li><NuxtLink to="/privacy-policy" class="hover:text-black">{{ $t('footer.privacy') }}</NuxtLink></li>
            <li><NuxtLink to="/terms-of-service" class="hover:text-black">{{ $t('footer.terms') }}</NuxtLink></li> -->
            <li><NuxtLink to="/license" class="hover:text-black">{{ $t('footer.license') }}</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-black">{{ $t('footer.privacy') }}</NuxtLink></li>
            <li><NuxtLink to="/terms" class="hover:text-black">{{ $t('footer.terms') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h5 class="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">{{ $t('footer.friendsList') }}</h5>
          <ul class="space-y-2">
            <li><a href="https://nuxtpro.com" target="_blank" rel="dofollow" class="hover:text-black">NuxtPro</a></li>
            <li><a href="https://github.com/PennyJoly/linktre-tools" target="_blank" class="hover:text-black">Linktre.cc</a></li>
            <li><a href="https://ai.linktre.cc" target="_blank" class="hover:text-black">CheapGpt</a></li>
            <li><a href="https://aitre.cc" target="_blank" class="hover:text-black">AITRE</a></li>
            <li><a href="https://creem.io" target="_blank" class="hover:text-black">Creem</a></li>
            <li><a href="https://devresourc.es" target="_blank" rel="nofollow" class="hover:text-black">Devresourc.es</a></li>
          </ul>
        </div>

      </div>
      <!-- 分割线cut line -->
      <hr class="my-8 border-gray-300" />
      <!-- copyright 版权信息 -->
      <div class="flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
        <div class="mb-4 sm:mb-0">
          &copy; {{ currentYear }} NuxtPro All Rights Reserved.
        </div>
        <div class="flex space-x-4">
          <a href="https://github.com/PennyJoly/nuxtpro" target="_blank" class="hover:text-black" aria-label="GitHub">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.397.098 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
          </a>
          <a href="https://x.com/PennyJoly" target="_blank" class="hover:text-black" aria-label="Twitter(X)">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://discord.gg/ZjgyZvp7" target="_blank" class="hover:text-black" aria-label="discord">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495a18.2962 18.2962 0 00-5.4844 0c-.1636-.3847-.3973-.8742-.6083-1.2495a.0741.0741 0 00-.0785-.0371 19.7363 19.7363 0 00-4.8851 1.5152.069.069 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8781-1.2994 1.229-2.0111a.0739.0739 0 00-.0426-.1044 13.6644 13.6644 0 01-1.5742-.8496.0711.0711 0 01-.021-.0561c-.0254-.114-.0576-.227-.087-.34a.0716.0716 0 01.0076-.0777c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0105c.1201.0991.246.1971.3718.2914a.0716.0716 0 01.0077.0777c-.0294.113-.0615.226-.087.34a.0711.0711 0 01-.021.0561 13.6649 13.6649 0 01-1.5742.8496.0739.0739 0 00-.0426.1044c.3509.7117.7674 1.3807 1.229 2.0111a.0777.0777 0 00.0842.0276c1.9516-.6067 3.9401-1.5219 5.9929-3.0294a.0824.0824 0 00.0312-.0561c.5004-5.177-.8382-9.6739-3.5485-13.6604a.069.069 0 00-.0321-.0277zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9744-2.4189 2.1569-2.4189 1.1966 0 2.157 1.0857 2.157 2.4189 0 1.3333-.9604 2.419-2.157 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9744-2.4189 2.1569-2.4189 1.1966 0 2.157 1.0857 2.157 2.4189 0 1.3333-.9604 2.419-2.157 2.419z"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'; // Import useI18n for translations

const { t } = useI18n(); // Initialize useI18n

const currentYear = computed(() => new Date().getFullYear());

// Note: You'll need to add the corresponding translations for the new keys
// (tagline, product, features, pricing, faq, resources, blog, etc.)
// to your locale files (e.g., en.json, zh.json).
// Example for en.json:
// {
//   "footer": {
//     "tagline": "Build your AI SaaS in days, simply and effortlessly.",
//     "product": "Product",
//     "features": "Features",
//     "pricing": "Pricing",
//     "faq": "FAQ",
//     "resources": "Resources",
//     "blog": "Blog",
//     "documentation": "Documentation",
//     "changelog": "Changelog",
//     "roadmap": "Roadmap",
//     "company": "Company",
//     "about": "About",
//     "contact": "Contact",
//     "waitlist": "Waitlist",
//     "legal": "Legal",
//     "license": "License Policy",
//     "privacy": "Privacy Policy",
//     "terms": "Terms of Service",
//     "rightsReserved": "All rights reserved."
//   }
// }
</script>

<style>
/* Add any specific styles for the footer here */
footer a {
  transition: color 0.2s ease-in-out;
}
/* Ensure SVGs in links inherit color */
footer a svg {
  display: inline-block; /* Or block depending on layout needs */
}
</style>