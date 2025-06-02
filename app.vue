<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

const {name} = useAppConfig() 

//赋予全局标题
useHead({
  title: name
});

//使用该方法获取全局属性里的值
// const config = useRuntimeConfig();
// const name = config.name;
// const baseUrl = config.public.baseUrl;

// const title = ref('Hello Nuxt3')
// console.log(111)

// const testButton = () =>{
//   console.log(222)
// }

// if(config.public.isServer){
//   console.log('server')
// }else{
//   console.log('client')
// }

// if(import.meta.server){
//   console.log('server11')
// }else{
//   console.log('client22')
// }

</script>