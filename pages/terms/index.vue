<template>
  <div class="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen py-16">
    <HeadNavbar />

    <Card class="max-w-4xl mx-auto my-8 shadow-lg">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-bold tracking-tight">{{ $t('terms.title') }}</CardTitle>
        <CardDescription class="text-muted-foreground">{{ $t('terms.subtitle') }}</CardDescription>
        <p class="text-sm text-muted-foreground pt-1">{{ $t('terms.date') }}</p>
      </CardHeader>
      <CardContent>
        <div class="prose prose-lg max-w-none">
          <h2 class="mt-8 border-b pb-2">{{ $t('terms.introduction.heading') }}</h2>
          <p>{{ $t('terms.introduction.p1') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('terms.useOfServices.heading') }}</h2>
          <p>{{ $t('terms.useOfServices.p1') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('terms.userAccounts.heading') }}</h2>
          <p>{{ $t('terms.userAccounts.p1') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('terms.intellectualProperty.heading') }}</h2>
          <p>{{ $t('terms.intellectualProperty.p1') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('terms.userContent.heading') }}</h2>
          <p>{{ $t('terms.userContent.p1') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('terms.prohibitedActivities.heading') }}</h2>
          <p>{{ $t('terms.prohibitedActivities.intro') }}</p>
          <ul class="list-disc pl-6">
            <li>{{ $t('terms.prohibitedActivities.item1') }}</li>
            <li>{{ $t('terms.prohibitedActivities.item2') }}</li>
            <li>{{ $t('terms.prohibitedActivities.item3') }}</li>
            <li>{{ $t('terms.prohibitedActivities.item4') }}</li>
          </ul>

          <h2 class="mt-12 border-b pb-2">{{ $t('terms.termination.heading') }}</h2>
          <p>{{ $t('terms.termination.p1') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('terms.limitationOfLiability.heading') }}</h2>
          <p>{{ $t('terms.limitationOfLiability.p1') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('terms.changes.heading') }}</h2>
          <p>{{ $t('terms.changes.p1') }}</p>

          <h2 class="mt-12 border-b pb-2">{{ $t('terms.contact.heading') }}</h2>
          <!-- Consider linking to your actual contact page or email -->
          <p><a href="https://x.com/PennyJoly" target="_blank">{{ $t('terms.contact.p1') }}</a></p>
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

const metaTitle = 'Terms of Service | OpenSource Nuxt SaaS Boilerplate | NuxtPro'
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
/* Reusing styles from privacy page for consistency */
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
  margin-top: theme('margin.12') !important;
  border-bottom-width: 1px;
  padding-bottom: theme('padding.2');
}

.prose h2:first-of-type {
   margin-top: theme('margin.8') !important; /* Less margin for the very first h2 */
}


.prose h3 {
 /* Ensure custom text color isn't overridden */
 color: theme('colors.gray.700') !important;
 margin-top: theme('margin.6') !important;
}

.prose p, .prose ul {
  /* Ensure default prose margins are applied unless overridden with ! */
  margin-top: theme('margin.4'); /* Example: Resetting to a default or specific value */
  margin-bottom: theme('margin.4');
}

.prose ul {
    padding-left: theme('padding.6');
}
.prose li {
    margin-top: theme('margin.1');
    margin-bottom: theme('margin.1');
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
.prose > :first-child {
  margin-top: 0 !important;
}
/* Ensure CardContent prose doesn't have excessive bottom padding */
.prose > :last-child {
  margin-bottom: 0 !important;
}
</style>