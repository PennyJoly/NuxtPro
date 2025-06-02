<template>
  <div class="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen py-16">
    <HeadNavbar />

    <!-- Page Title -->
    <div class="text-center mt-12 mb-8"> <!-- Adjusted margin -->
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {{ $t('roadmap.title') }} <!-- Use i18n key -->
      </h1>
      <!-- Subtitle -->
      <p class="mt-3 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
        {{ $t('roadmap.description') || 'Here is our plan for the upcoming features and improvements.' }}
      </p>
    </div>

    <!-- Changed to Grid Layout for 3 Timelines -->
    <div class="max-w-7xl mx-auto mt-0 mb-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- Column 1: Completed Timeline -->
      <div v-if="completedFeatures.length > 0" class="timeline-container relative">
         <!-- Vertical Line for this column -->
         <div class="absolute left-4 top-2 bottom-0 w-0.5 bg-gray-300 hidden sm:block"></div>
         <!-- Completed Section -->
         <div class="timeline-section mb-12">
            <h2 class="text-xl font-semibold text-green-600 mb-6 pl-10 relative">
                <div class="timeline-dot bg-green-500 border-green-600" style="left: -0.625rem;"></div> <!-- Adjusted left -->
                {{ $t('roadmap.status.completed') }}
            </h2>
            <div v-for="(item, index) in completedFeatures" :key="`completed-${index}`" class="timeline-item ml-10 pl-6 pb-6 relative border-l border-transparent">
                <Card class="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent class="pt-4 text-sm">
                    <p class="font-semibold text-gray-800">{{ item.title }}</p>
                    <p class="text-gray-600 mt-1">{{ item.description }}</p>
                    <p v-if="item.date" class="text-xs text-gray-500 mt-2">({{ item.date }})</p>
                    </CardContent>
                </Card>
            </div>
         </div>
      </div>
      <div v-else class="hidden md:block"></div> <!-- Placeholder if no completed items -->

      <!-- Column 2: In Progress Timeline -->
      <div v-if="inProgressFeatures.length > 0" class="timeline-container relative">
        <!-- Vertical Line for this column -->
        <div class="absolute left-4 top-2 bottom-0 w-0.5 bg-gray-300 hidden sm:block"></div>
        <!-- In Progress Section -->
        <div class="timeline-section mb-12">
            <h2 class="text-xl font-semibold text-orange-500 mb-6 pl-10 relative">
                <div class="timeline-dot bg-orange-400 border-orange-500" style="left: -0.625rem;"></div> <!-- Adjusted left -->
                {{ $t('roadmap.status.inProgress') }}
            </h2>
            <div v-for="(item, index) in inProgressFeatures" :key="`progress-${index}`" class="timeline-item ml-10 pl-6 pb-6 relative border-l border-transparent">
                <Card class="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent class="pt-4 text-sm">
                    <p class="font-semibold text-gray-800">{{ item.title }}</p>
                    <p class="text-gray-600 mt-1">{{ item.description }}</p>
                    <p v-if="item.date" class="text-xs text-gray-500 mt-2">({{ item.date }})</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
       <div v-else class="hidden md:block"></div> <!-- Placeholder if no in-progress items -->

      <!-- Column 3: Planned Timeline -->
      <div v-if="plannedFeatures.length > 0" class="timeline-container relative">
        <!-- Vertical Line for this column -->
        <div class="absolute left-4 top-2 bottom-0 w-0.5 bg-gray-300 hidden sm:block"></div>
        <!-- Planned Section -->
        <div class="timeline-section mb-12">
            <h2 class="text-xl font-semibold text-blue-600 mb-6 pl-10 relative">
                <div class="timeline-dot bg-blue-400 border-blue-500" style="left: -0.625rem;"></div> <!-- Adjusted left -->
                {{ $t('roadmap.status.planned') }}
            </h2>
            <div v-for="(item, index) in plannedFeatures" :key="`planned-${index}`" class="timeline-item ml-10 pl-6 pb-6 relative border-l border-transparent">
                <Card class="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent class="pt-4 text-sm">
                    <p class="font-semibold text-gray-800">{{ item.title }}</p>
                    <p class="text-gray-600 mt-1">{{ item.description }}</p>
                    <p v-if="item.date" class="text-xs text-gray-500 mt-2">({{ item.date }})</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
      <div v-else class="hidden md:block"></div> <!-- Placeholder if no planned items -->


      <!-- Optional: Message if no features are listed -->
      <div v-if="completedFeatures.length === 0 && inProgressFeatures.length === 0 && plannedFeatures.length === 0" class="md:col-span-3 text-center py-10">
        <Card class="shadow-lg inline-block">
           <CardContent class="pt-6">
               <p class="text-muted-foreground">{{ $t('roadmap.noFeatures') || '暂无路线图信息。' }}</p>
           </CardContent>
        </Card>
      </div>

    </div>

    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// Ensure Card components are correctly imported or globally registered
import { Card, CardContent } from '@/components/ui/card';
// Assuming HeadNavbar and AppFooter are globally registered or imported elsewhere

const { t, tm } = useI18n();
const config = useRuntimeConfig();

useHead({
  link: [
    { rel: 'canonical', href: config.public.baseUrl || 'https://nuxtpro.com' }
  ]
})

const metaTitle = 'Roadmap | OpenSource Nuxt SaaS Boilerplate | NuxtPro'
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

// Define the feature type based on the structure in i18n files
type Feature = {
  title: string;
  description: string;
  date?: string; // Optional date for completed/estimated
};

// Helper function to safely get features and validate them
// Updated to directly fetch arrays and validate items
const getValidatedFeatures = (status: 'completed' | 'inProgress' | 'planned'): Feature[] => {
  const featuresData = tm(`roadmap.sections.${status}`) as unknown;

  // Runtime check if it's an array
  if (!Array.isArray(featuresData)) {
    // console.warn(`Expected an array for roadmap.sections.${status}, but received:`, typeof featuresData);
    return [];
  }

  // Filter and validate each item in the array using a type guard
  const validFeatures: Feature[] = featuresData.filter(
    (f: unknown): f is Feature => // Type guard to check structure
      typeof f === 'object' &&
      f !== null &&
      typeof (f as Feature).title === 'string' &&
      typeof (f as Feature).description === 'string'
      // date is optional
  );

  // Optional: Warn if some items were invalid
  if (validFeatures.length !== featuresData.length && featuresData.length > 0) {
      console.warn(`[Roadmap] Some items under roadmap.sections.${status} were filtered out as invalid Feature objects.`);
  }

  return validFeatures;
};


// Computed property to gather all features directly from i18n
const allFeatures = computed(() => {
  const features: {
    completed: Feature[];
    inProgress: Feature[];
    planned: Feature[];
   } = {
    completed: getValidatedFeatures('completed'),
    inProgress: getValidatedFeatures('inProgress'),
    planned: getValidatedFeatures('planned'),
  };

  // Optional: Sorting if needed (e.g., by date if available, or title)
  // features.completed.sort((a, b) => a.title.localeCompare(b.title));
  // features.inProgress.sort((a, b) => a.title.localeCompare(b.title));
  // features.planned.sort((a, b) => a.title.localeCompare(b.title));

  return features;
});

// Computed properties for each column, using the new structure
const completedFeatures = computed(() => allFeatures.value.completed);
const inProgressFeatures = computed(() => allFeatures.value.inProgress); // Renamed
const plannedFeatures = computed(() => allFeatures.value.planned);

</script>

<style>
body {
  padding-top: 64px; /* Adjust if your navbar height is different */
}

/* Basic Timeline Styles - applied within each column's .timeline-container */
.timeline-container {
  position: relative;
}

/* Styling for the colored status dots */
.timeline-dot {
  position: absolute;
  /* left: -0.75rem; */ /* Original value, adjusted inline now based on padding/margin */
  top: 50%;
  transform: translateY(-50%);
  width: 1rem; /* Dot size */
  height: 1rem; /* Dot size */
  border-radius: 50%;
  border-width: 3px; /* Border width */
  background-color: theme('colors.white'); /* Dot fill */
  z-index: 10; /* Ensure dot is above the line */
}

/* Position timeline headers relative for dot positioning */
.timeline-section h2 {
  position: relative;
  /* Adjusted padding in template */
}

/* Add a subtle line connecting items to the main line within each column */
.timeline-item::before {
  content: '';
  position: absolute;
  left: -2px; /* Adjusted slightly left relative to item padding */
  top: 0;
  bottom: 0; /* Extends based on item padding-bottom */
  width: 2px;
  background-color: theme('colors.gray.200'); /* Connecting line color */
}

/* Style the last item's connecting line */
.timeline-section > .timeline-item:last-child::before {
   height: 1rem; /* Shorter line for the last item, adjust as needed */
}

/* Remove default list styling */
ul {
  list-style: none;
  padding: 0 !important;
  margin: 0 !important;
}
li {
  margin: 0 !important;
}

.text-muted-foreground {
  color: theme('colors.gray.500') !important;
}
</style>