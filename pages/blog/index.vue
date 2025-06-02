<template>
  <div>
    <HeadNavbar />

    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4">{{ $t('blog.title') }}</h2>
        <p class="text-xl text-gray-600 text-center mb-12">{{ $t('blog.description') }}</p>
        
        <!-- Category Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <Button 
            v-for="category in uniqueCategories" 
            :key="category"
            @click="selectedCategory = category"
            :variant="selectedCategory === category ? 'secondary' : 'outline'"
            size="sm" 
            class="rounded-full px-4"
          >
            <h2>{{ category === 'All' ? $t('blog.list.filterAll') : category }}</h2>
          </Button>
        </div>

        <!-- Blog Post Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            v-for="post in filteredBlogPosts" 
            :key="post.slug" 
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
          >
            <!-- Banner Image -->
             <NuxtLink :to="`/blog/${post.slug}`" class="block">
                <img 
                  v-if="post.imageUrl" 
                  :src="post.imageUrl" 
                  :alt="post.title" 
                  class="w-full h-48 object-cover" 
                />
            </NuxtLink>
             
            <CardHeader class="flex-grow p-6">
              <NuxtLink :to="`/blog/${post.slug}`" class="block hover:no-underline">
                <CardTitle class="text-xl lg:text-2xl font-semibold hover:text-purple-600 transition-colors mb-2"> 
                  {{ post.title }}
                </CardTitle>
              </NuxtLink>
              <CardDescription class="text-gray-500 mb-3">{{ post.date }}</CardDescription>
               <!-- Category Tags -->
               <div v-if="post.categories && post.categories.length" class="mt-2">
                 <span 
                    v-for="category in post.categories" 
                    :key="category"
                    class="inline-block bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2"
                 >
                    {{ category }}
                 </span>
               </div>
            </CardHeader>
            <CardContent class="flex-grow p-6 pt-0">
              <p class="text-gray-700 line-clamp-3">{{ post.excerpt }}</p>
            </CardContent>
            <CardFooter class="p-6 pt-0">
              <NuxtLink :to="`/blog/${post.slug}`">
                 <Button variant="link" class="p-0 h-auto text-purple-600 hover:text-purple-800 font-medium"> 
                   {{ $t('blog.list.readMore') }} <span aria-hidden="true" class="ml-1">&rarr;</span>
                 </Button>
              </NuxtLink>
            </CardFooter>
          </Card>

          <div v-if="!filteredBlogPosts.length" class="text-center text-gray-500 py-10 md:col-span-2 lg:col-span-3">
             {{ $t('blog.list.noPostsInCategory') }} "{{ selectedCategory }}"
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HeadNavbar from '~/components/HeadNavbar.vue';
import AppFooter from '~/components/AppFooter.vue';
//import { useSeoMeta } from '#imports';

const { t } = useI18n();
const config = useRuntimeConfig();

useHead({
  link: [
    { rel: 'canonical', href: config.public.baseUrl || 'https://nuxtpro.com' }
  ]
})

const metaTitle = 'Blog | OpenSource Nuxt SaaS Boilerplate | NuxtPro'
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

// Sample blog post data with categories and imageUrl
const blogPosts = ref([
  {
    slug: 'first-post',
    title: 'My First Blog Post',
    date: 'July 26, 2024',
    excerpt: 'A summary exploring the initial setup and core features of building this blog with Nuxt and shadcn-nuxt.',
    content: '...',
    categories: ['Nuxt', 'Web Development'],
    imageUrl: 'https://picsum.photos/seed/firstpost/600/400' // Placeholder image URL
  },
  {
    slug: 'styling-with-shadcn',
    title: 'Styling with shadcn-nuxt',
    date: 'July 27, 2024',
    excerpt: 'Discover how to leverage shadcn-nuxt\'s beautiful components like Cards and Buttons to quickly build elegant interfaces.',
    content: '...',
    categories: ['UI/UX', 'shadcn-nuxt', 'Vue'],
    imageUrl: 'https://picsum.photos/seed/shadcn/600/400' // Placeholder image URL
  },
   {
    slug: 'nuxt-server-routes',
    title: 'Server Routes in Nuxt 3',
    date: 'July 28, 2024',
    excerpt: 'Learn the basics of creating API endpoints and server middleware within your Nuxt 3 project for backend logic.',
    content: '...',
    categories: ['Nuxt', 'Backend', 'API'],
    imageUrl: 'https://picsum.photos/seed/nuxtroutes/600/400' // Placeholder image URL
  },
  {
    slug: 'vue-reactivity',
    title: 'Understanding Vue 3 Reactivity',
    date: 'July 29, 2024',
    excerpt: 'A deep dive into how Vue 3\'s reactivity system works under the hood using Proxies.',
    content: '...',
    categories: ['Vue', 'JavaScript'],
    imageUrl: 'https://picsum.photos/seed/reactivity/600/400' // Placeholder image URL
  },
  {
    slug: 'vue-reactivity',
    title: 'Understanding Vue 3 Reactivity',
    date: 'July 29, 2024',
    excerpt: 'A deep dive into how Vue 3\'s reactivity system works under the hood using Proxies.',
    content: '...',
    categories: ['Vue', 'JavaScript'],
    imageUrl: 'https://picsum.photos/seed/reactivity/600/400' // Placeholder image URL
  },
  {
    slug: 'vue-reactivity',
    title: 'Understanding Vue 3 Reactivity',
    date: 'July 29, 2024',
    excerpt: 'A deep dive into how Vue 3\'s reactivity system works under the hood using Proxies.',
    content: '...',
    categories: ['Vue', 'JavaScript'],
    imageUrl: 'https://picsum.photos/seed/reactivity/600/400' // Placeholder image URL
  }
]);

// State for category filtering
const selectedCategory = ref('All'); // Default to 'All'

// Compute unique categories from posts
const uniqueCategories = computed(() => {
  const allCategories = blogPosts.value.flatMap(post => post.categories || []);
  // Add 'All' and ensure uniqueness
  return ['All', ...new Set(allCategories)]; 
});

// Compute filtered blog posts based on selected category
const filteredBlogPosts = computed(() => {
  if (selectedCategory.value === 'All') {
    return blogPosts.value;
  }
  return blogPosts.value.filter(post => 
    post.categories && post.categories.includes(selectedCategory.value)
  );
});

</script>

<style scoped>

</style>