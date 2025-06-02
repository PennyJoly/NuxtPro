<template>
  <div>
    <HeadNavbar />

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        
        <div class="lg:col-span-2">
          <NuxtLink 
              to="/blog" 
              class="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 mb-8 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {{ $t('blog.detail.backLink') }}
          </NuxtLink>

          <article v-if="post">
            {/* --- Banner Image (Enlarged) --- */}
            <img 
               v-if="post.imageUrl" 
               :src="post.imageUrl" 
               :alt="post.title" 
               class="w-full h-96 object-cover rounded-lg mb-8 shadow-md" 
            />
            
            {/* --- Post Header (Left Aligned) --- */}
            <div class="mb-8">
              <h1 class="text-4xl lg:text-5xl font-bold mb-4">{{ post.title }}</h1>
              <p class="text-gray-500 text-base">
                 {{ $t('blog.detail.publishedOn') }} {{ post.date }} <span v-if="post.author"> · {{ $t('blog.detail.byAuthor') }} {{ post.author }}</span>
              </p>
            </div>

            <Separator class="my-10" />

            {/* --- Post Content (with ID injection for ToC) --- */}
            <div class="prose prose-lg lg:prose-xl max-w-none prose-a:text-purple-600 hover:prose-a:text-purple-800 prose-strong:font-semibold prose-headings:font-bold" ref="contentRef">
              <!-- Content will be injected here by renderMarkdown -->
            </div>

            {/* --- Post Footer Info (Updated Tag Style) --- */}
            <Separator class="my-10" />
            <div class="text-sm text-gray-600">
              <div v-if="post.categories && post.categories.length" class="mb-4">
                <span class="font-semibold mr-2">{{ $t('blog.detail.categories') }}:</span>
                <span 
                   v-for="(category, index) in post.categories" 
                   :key="category" 
                   class="inline-block bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2"
                >
                  {{ category }}
                </span>
              </div>
              <!-- Placeholder for Tags if needed -->
              <!-- <div><span class="font-semibold">Tags:</span> ... </div> -->
            </div>
          </article>
          
          <div v-else class="text-center py-16 lg:col-span-3">
            <p class="text-2xl font-semibold text-gray-700 mb-4">{{ $t('blog.detail.notFoundTitle') }}</p>
            <p class="text-lg text-gray-500 mb-6">{{ $t('blog.detail.notFoundMessage') }}</p>
             <NuxtLink to="/blog">
               <Button variant="outline" size="lg" class="border-gray-300 hover:bg-gray-50">
                 {{ $t('blog.detail.backLink') }}
               </Button>
             </NuxtLink>
          </div>
        </div>

        <aside v-if="post" class="lg:col-span-1 relative">
           <div v-if="tocItems.length > 0" class="mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-100 mb-8" ref="tocCardRef">
              <h3 class="text-lg font-semibold mb-4 border-b pb-2">{{ $t('blog.detail.tocTitle') }}</h3>
              <ul class="space-y-2 max-h-96 overflow-y-auto">
                 <li v-for="item in tocItems" :key="item.id" :class="{ 'pl-4': item.level === 3, 'pl-8': item.level === 4 }">
                    <a :href="'#' + item.id" class="text-sm text-gray-600 hover:text-purple-600 hover:underline transition-colors">
                       {{ item.text }}
                    </a>
                 </li>
              </ul>
           </div>

           <div v-else-if="tocItems.length === 0 && post" class="mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-100 mb-8">
              <h3 class="text-lg font-semibold mb-4 border-b pb-2">{{ $t('blog.detail.tocTitle') }}</h3>
              <p class="text-sm text-gray-500">没有可用的目录。</p>
           </div>

           <div class="p-6 bg-white rounded-lg shadow-md border border-gray-100" ref="analyticsCardRef">
              <h3 class="text-lg font-semibold mb-4 border-b pb-2">{{ $t('blog.detail.statsTitle') }}</h3>
              <div class="space-y-4">
                 <div class="flex items-center text-sm text-gray-700">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-gray-400">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                       <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                    <span class="font-medium mr-1">{{ post.views?.toLocaleString() || 'N/A' }}</span>
                    <span>{{ $t('blog.detail.viewsLabel') }}</span>
                 </div>
                 <div class="flex items-center text-sm text-gray-700">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-gray-400">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                    <span class="font-medium mr-1">{{ post.avgTime || 'N/A' }}</span>
                    <span>{{ $t('blog.detail.avgTimeLabel') }}</span>
                 </div>
                 <div v-if="post.viewsTrend && post.viewsTrend.length > 1" class="mt-4">
                    <p class="text-xs text-gray-500 mb-1">Views Trend (Last 7 Days)</p>
                    <svg 
                      class="w-full h-16" 
                      viewBox="0 0 100 25" 
                      preserveAspectRatio="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline 
                        :points="generateSparklinePoints(post.viewsTrend)" 
                        fill="none" 
                        stroke="#8B5CF6" 
                        stroke-width="1.5" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                      />
                    </svg>
                 </div>
              </div>
           </div>
        </aside>

      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import HeadNavbar from '~/components/HeadNavbar.vue';
import AppFooter from '~/components/AppFooter.vue';
import { useSeoMeta } from '#imports';
import { marked } from 'marked';
import { slugify } from '~/utils/slugify';

const route = useRoute();
const { t } = useI18n();
const slug = route.params.slug;
const post = ref(null);
const tocItems = ref([]);
const contentRef = ref(null);
const tocCardRef = ref(null);
const analyticsCardRef = ref(null);

const blogPostsData = [
   { 
     slug: 'first-post', 
     title: 'My First Blog Post', 
     date: 'July 26, 2024', 
     excerpt: 'A summary exploring the initial setup and core features of building this blog with Nuxt and shadcn-nuxt.', 
     content: `## Introduction\n\nThis is the first post on our new blog! We'll cover the basics of how this site was built using Nuxt 3 and the shadcn-nuxt UI component library.\n\n### Key Technologies\n\n*   **Nuxt 3:** A powerful Vue.js framework.\n*   **shadcn-nuxt:** Beautifully designed components.\n*   **Tailwind CSS:** For utility-first styling.\n*   **Markdown:** For writing content.\n\n## Setup Process\n\nDetails about the setup...\n\n### Initializing Nuxt\n\nMore details...\n\n## Conclusion\n\nSummary of the post.`,
     author: 'Alex Doe',
     categories: ['Nuxt', 'Web Development'],
     imageUrl: 'https://picsum.photos/seed/firstpost/800/400',
     views: 1523,
     avgTime: '4 min read',
     viewsTrend: [10, 30, 25, 50, 45, 70, 65] 
   },
   { 
     slug: 'styling-with-shadcn', 
     title: 'Styling with shadcn-nuxt', 
     date: 'July 27, 2024', 
     excerpt: 'Discover how to leverage shadcn-nuxt\'s beautiful components like Cards and Buttons to quickly build elegant interfaces.', 
     content: `## Using Components\n\nShadcn-nuxt offers a variety of pre-built components that integrate seamlessly with Tailwind CSS. \n\n\`\`\`vue\n<template>\n  <Button variant="outline">Click Me</Button>\n  <Card>\n    <CardHeader>Card Title</CardHeader>\n    <CardContent>Card body content...</CardContent>\n  </Card>\n</template>\n\`\`\`\n\nThis makes it easy to create consistent and good-looking UIs.\n\n### Card Component\n\nExample usage...\n\n### Button Component\n\nAnother example...`,
     author: 'Jane Smith',
     categories: ['UI/UX', 'shadcn-nuxt', 'Vue'],
     imageUrl: 'https://picsum.photos/seed/shadcn/800/400',
     views: 2105,
     avgTime: '5 min read',
     viewsTrend: [50, 45, 60, 80, 75, 95, 110] 
   },
   { 
     slug: 'nuxt-server-routes', 
     title: 'Server Routes in Nuxt 3', 
     date: 'July 28, 2024', 
     excerpt: 'Learn the basics of creating API endpoints and server middleware within your Nuxt 3 project for backend logic.', 
     content: `## Creating API Endpoints\n\nNuxt 3 allows you to create server-side routes easily within the \`/server/api\` directory. \n\nFor example, a file named \`/server/api/hello.js\`:\n\n\`\`\`js\nexport default defineEventHandler(() => {\n  return { message: 'Hello from the API!' };\n});\n\`\`\`\n\nYou can then fetch this endpoint from your components.\n\n## Middleware\n\nExplanation of server middleware...`,
     author: 'Alex Doe',
     categories: ['Nuxt', 'Backend', 'API'],
     imageUrl: 'https://picsum.photos/seed/nuxtroutes/800/400',
     views: 980,
     avgTime: '3 min read',
     viewsTrend: [20, 15, 30, 28, 40, 35, 50] 
   },
    {
     slug: 'vue-reactivity', 
     title: 'Understanding Vue 3 Reactivity', 
     date: 'July 29, 2024', 
     excerpt: 'A deep dive into how Vue 3\'s reactivity system works under the hood using Proxies.', 
     content: '## Core Concepts\n\nExplaining refs and reactives...\n\n### Proxies Explained\n\nHow Vue 3 uses Proxies...\n\n### Reactivity in Action\n\nExamples...', 
     author: 'Chris Lee',
     categories: ['Vue', 'JavaScript'],
     imageUrl: 'https://picsum.photos/seed/reactivity/800/400',
     views: 1850,
     avgTime: '6 min read',
     viewsTrend: [60, 70, 65, 90, 100, 95, 120] 
   }
];

const generateSparklinePoints = (trendData) => {
  if (!trendData || trendData.length < 2) return '';
  const maxVal = Math.max(...trendData);
  const minVal = Math.min(...trendData);
  const range = maxVal - minVal || 1;
  const width = 100;
  const height = 25;
  const points = trendData.map((value, index) => {
    const x = (index / (trendData.length - 1)) * width;
    const y = height - ((value - minVal) / range) * height;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  return points.join(' ');
};

const renderMarkdown = (content) => {
  console.log("开始渲染 Markdown");
  if (!content) {
      console.log("Markdown 内容为空");
      return '';
  }
  
  tocItems.value = [];
  console.log("尝试解析 Markdown tokens");
  try {
      const tokens = marked.lexer(content);
      console.log("Markdown tokens 解析成功:", tokens);
      const renderer = new marked.Renderer();

      renderer.heading = (text, level) => {
          console.log(`发现标题: level ${level}, text: ${text}`);
          if (level >= 2 && level <= 3) { 
              let id = '';
              try {
                 id = slugify(text);
                 console.log(`Slugify 成功: text="${text}", id="${id}"`);
                 if(id) {
                    tocItems.value.push({ level, text, id });
                 } else {
                     console.warn(`Slugify 返回空 id for text: ${text}`);
                 }
              } catch (e) {
                 console.error(`Slugify 函数出错 for text: ${text}`, e);
                 id = `heading-${Math.random().toString(36).substring(7)}`;
              }
              return `<h${level} id="${id}">${text}</h${level}>`;
          }
          return `<h${level}>${text}</h${level}>`; 
      };

      console.log("准备使用自定义渲染器解析 Markdown");
      const html = marked.parse(content, { renderer });
      console.log("Markdown 解析为 HTML 完成", html ? html.substring(0, 100) + '...' : '');
      
      nextTick(() => {
          console.log("nextTick 回调执行");
          if (contentRef.value) {
              console.log("设置 contentRef.innerHTML");
              contentRef.value.innerHTML = html;
          } else {
              console.warn("contentRef.value 为空，无法设置 innerHTML");
          }
      });
      
      return ''; 
  } catch (e) {
      console.error("解析 Markdown 时发生错误:", e);
      return '<p>Error rendering content.</p>';
  }
};

onMounted(async () => {
  console.log(`页面挂载，路由 slug: ${slug}`);
  const foundPost = blogPostsData.find(p => p.slug === slug) || null;
  console.log("查找文章数据结果:", foundPost ? foundPost.title : '未找到');
  post.value = foundPost;

  if (foundPost && foundPost.content) {
      console.log("文章内容存在，调用 renderMarkdown");
      renderMarkdown(foundPost.content);
      
      console.log("等待 nextTick 以确保 DOM 更新");
      await nextTick(); 
      console.log("nextTick 完成");
  } else {
      console.warn("未找到文章或文章内容为空", foundPost);
  }
});

const pageTitle = computed(() => post.value ? `${post.value.title} | ${t('blog.detail.seoTitleSuffix')}` : t('blog.detail.notFoundSeoTitle'));
const pageDescription = computed(() => post.value ? post.value.excerpt : t('blog.detail.notFoundSeoDescription'));

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: computed(() => post.value?.imageUrl || '/og-image.jpg'),
});

</script>

<style>
.prose {
  color: #374151;
}
.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #111827;
  margin-bottom: 0.6em;
  margin-top: 1.6em;
}
.prose h1 { margin-top: 0; }

.prose p {
  margin-bottom: 1.25em;
  line-height: 1.7;
}
.prose strong {
  color: #111827;
}
.prose a {
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}
.prose a:hover {
   text-decoration: underline;
}
.prose pre {
  background-color: #f3f4f6;
  color: #1f2937;
  padding: 1.25rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.prose pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 0.9em;
}
.prose ul, .prose ol {
   margin-bottom: 1.25em;
   padding-left: 1.6em;
}
.prose li {
  margin-bottom: 0.6em;
}
.prose li::marker {
   color: #6b7280;
}

.prose h2[id],
.prose h3[id],
.prose h4[id] {
  scroll-margin-top: 6rem;
}
</style>