<script setup>
import { Link } from '@inertiajs/vue3';
const props = defineProps({
  action: String,
});
</script>

<template>
  <li class="inline-flex items-center">
    <div class="flex items-center">
        <svg
            class="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"></path></svg>
        <Link
            href="#"
            class="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
        >{{ action }}
        </Link>
    </div>
  </li>
</template>
