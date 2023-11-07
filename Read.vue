
<script setup>
import { Link } from '@inertiajs/vue3'
import { EyeIcon } from "@heroicons/vue/24/solid"
const props = defineProps({
  item: { type: Object }
})

</script>

<template>
  <Link
    :href="route(`backend.${ $page.props.routeNameData }.show`, item.id)"
    v-if="$page.props.permissions.includes(`read ${ $page.props.routeNameData }`) || $page.props.auth.user.super_admin"
    class="float-left pr-4 py-2 duration-100 rounded hover:text-green-600"
  >
    <EyeIcon class="w-6 h-6" />
  </Link>
</template>