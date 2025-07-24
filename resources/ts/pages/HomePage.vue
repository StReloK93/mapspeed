<template>
   <main
      class="h-full w-full relative rounded-xl overflow-hidden flex items-center justify-center bg-[url('/icons/background.jpg')] bg-center bg-cover">
      <div class="flex gap-4 bg-gray-100/50 backdrop-blur-sm py-14 px-16 rounded-xl">
         <RouterLink to="graders" v-if="env.SHARQIY" class="bg-yellow-200 w-28 h-28 p-1.5 rounded-xl shadow-md grayscale hover:grayscale-0 transition-all">
            <img src="@icons/grader.png">
            <tippy target="_parent">
               <div>Greyderlar ishini kuzatish</div>
            </tippy>
         </RouterLink>

         <RouterLink  to="/trucks"
            class="bg-orange-200 w-28 h-28 p-1.5 rounded-xl shadow-md grayscale hover:grayscale-0  transition-all">
            <img src="@icons/truck.png">
            <tippy target="_parent">
               <div>Avtoag'dargichlar tezlik xaritasi</div>
            </tippy>
         </RouterLink>
         <RouterLink v-if="env.SHARQIY" to="water-truck" class="bg-sky-200 w-28 h-28 p-1.5 rounded-xl shadow-md grayscale hover:grayscale-0  transition-all">
            <img src="@icons/watertruck.png">
            <tippy target="_parent">
               <div>Suv sepuvchi texnikalar harakati</div>
            </tippy>
         </RouterLink>
         <RouterLink v-if="env.SHARQIY" to="offenders" class="bg-red-400 w-28 h-28 p-4 rounded-xl shadow-md grayscale hover:grayscale-0  transition-all">
            <img src="@icons/speed.png">
            <tippy target="_parent">
               <div>Yo'l qoidalarini buzgan transportlar</div>
            </tippy>
         </RouterLink>

         <RouterLink v-if="env.SHARQIY" to="geozones"
            class="bg-gray-200 w-28 h-28 p-3 rounded-xl shadow-md grayscale hover:grayscale-0  transition-all">
            <img src="@icons/excavator.png">
            <tippy target="_parent">
               <div>Geozonalar</div>
            </tippy>
         </RouterLink>

         <RouterLink to="ways"
            class="bg-gray-200 w-28 h-28 p-3 rounded-xl shadow-md grayscale hover:grayscale-0  transition-all">
            <img src="@icons/road.png">
            <tippy target="_parent">
               <div>Yo'llarni tekshirish</div>
            </tippy>
         </RouterLink>
         <RouterLink to="ways-redactor"
            class="bg-gray-200 w-28 h-28 p-3 rounded-xl shadow-md grayscale hover:grayscale-0  transition-all">
            <img src="@icons/road.webp">
            <tippy target="_parent">
               <div>Yo'llarni tamirlash</div>
            </tippy>
         </RouterLink>
      </div>
   </main>
</template>
<script lang="ts" setup>
const env = ENV
</script>