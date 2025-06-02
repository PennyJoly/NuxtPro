<template>
  <div class="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen py-16">
    <HeadNavbar />

    <Card class="max-w-4xl mx-auto my-8 shadow-lg">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-bold tracking-tight">{{ $t('license.title') }}</CardTitle>
        <CardDescription class="text-muted-foreground">{{ $t('license.subtitle') }}</CardDescription>
        <p class="text-sm text-muted-foreground pt-1">{{ $t('license.date') }}</p>
      </CardHeader>
      <CardContent>
        <div class="prose prose-lg max-w-none">
          <h2 class="mt-8 border-b pb-2">{{ $t('license.section1.heading') }}</h2>
          <h3 class="text-gray-700 !mt-6">{{ $t('license.section1.subheading') }}</h3>
          <p>{{ $t('license.section1.p1') }}</p>
          <p>{{ $t('license.section1.p2') }}</p>

          <h3 class="text-gray-700 !mt-6">{{ $t('license.section2.heading') }}</h3>
          <p>{{ $t('license.section2.item1') }}</p>
          <p>{{ $t('license.section2.item2') }}</p>
          <p>{{ $t('license.section2.item3') }}</p>
          <p>{{ $t('license.section2.item4') }}</p>

          <h3 class="text-gray-700 !mt-6">{{ $t('license.section3.heading') }}</h3>
          <p>{{ $t('license.section3.item1') }}</p>
          <p>{{ $t('license.section3.item2') }}</p>
          <p>{{ $t('license.section3.item3') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('license.section4.heading') }}</h2>
          <h3 class="text-gray-700 !mt-6">{{ $t('license.section4.subheading1') }}</h3>
          <p>{{ $t('license.section4.item1a') }}</p>
          <p>{{ $t('license.section4.item1b') }}</p>
          <h3 class="text-gray-700 !mt-6">{{ $t('license.section4.subheading2') }}</h3>
          <p>{{ $t('license.section4.item2a') }}</p>
          <p>{{ $t('license.section4.item2b') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('license.section5.heading') }}</h2>
          <p>{{ $t('license.section5.p1') }}</p>
          <p>{{ $t('license.section5.p2') }}</p>
          <p>{{ $t('license.section5.p3') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('license.section6.heading') }}</h2>
          <p><a href="https://x.com/PennyJoly" target="_blank">{{ $t('license.section6.p1') }}</a></p>
        </div>
      </CardContent>
    </Card>

    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const config = useRuntimeConfig();

useHead({
  link: [
    { rel: 'canonical', href: config.public.baseUrl || 'https://nuxtpro.com' }
  ]
})

const metaTitle = 'License | OpenSource Nuxt SaaS Boilerplate | NuxtPro'
const metaDescription = 'The NuxtJS boilerplate with all the stuff you need to get your product in front of customers. From idea to production in 5 minutes.'


useHead({
  title: metaTitle,
  meta: [
    {
      name: 'description',
      content: 'The NuxtJS boilerplate with all the stuff you need to get your product in front of customers. From idea to production in 5 minutes.'
    },
    {
      name: 'keywords',
      content: 'NuxtPro, NuxtJS boilerplate, NuxtJS starter, NuxtJS template, NuxtJS, Vue, Nuxt3,,Open-Source'
      
    }
  ]
})



useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage: '/og-image.jpg', // Make sure this image exists in your public folder
  ogUrl: config.public.baseUrl || 'https://nuxtpro.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterSite: config.public.baseUrl || 'https://nuxtpro.com',
  twitterImage: '/twitter-image.jpg'
});
</script>

<style>
/* Ensure prose styles don't override link colors unintentionally */
.prose a {
  color: theme('colors.blue.600'); /* Or your desired link color */
}

.prose a:hover {
  color: theme('colors.blue.800');
}

/* Optional: Adjust prose background if needed for better contrast on gradient */
/* .prose { */
  /* background-color: rgba(255, 255, 255, 0.85); Example: Add a subtle white background */
  /* padding: 2rem; */
  /* border-radius: 0.5rem; */
  /* box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); */
/* } */

/* Add padding below the fixed navbar */
body {
  padding-top: 64px; /* Match navbar height */
}

/* Tailwind prose overrides using !important where needed */
.prose h2 {
  /* You can add specific h2 overrides here if needed */
}

.prose h3 {
 /* Ensure custom text color isn't overridden */
 color: theme('colors.gray.700') !important;
}

.prose p, .prose ul {
  /* Ensure default prose margins are applied unless overridden with ! */
  margin-top: theme('margin.4'); /* Example: Resetting to a default or specific value */
  margin-bottom: theme('margin.4');
}

.prose .text-muted-foreground {
  color: theme('colors.gray.500') !important; /* Ensure muted color */
}

/* Removing default margins specifically where overridden */
.prose .mt-0 { margin-top: 0 !important; }
.prose .mb-1 { margin-bottom: 0.25rem !important; } /* Tailwind's mb-1 */
.prose .mt-2 { margin-top: 0.5rem !important; } /* Tailwind's mt-2 */
.prose .mt-6 { margin-top: 1.5rem !important; } /* Tailwind's mt-6 */

/* Ensure CardContent prose doesn't have excessive top padding */
.prose :first-child {
  margin-top: 0;
}
</style>