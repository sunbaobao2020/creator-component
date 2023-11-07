<script setup>
import { Link } from '@inertiajs/vue3'
import { PencilSquareIcon } from "@heroicons/vue/24/solid"
const props = defineProps({
  item: { type: Object }
})

</script>

<template>
    <Link
      :href="route(`backend.${ $page.props.routeNameData }.edit`, item.id)"
      v-if="$page.props.permissions.includes(`edit ${ $page.props.routeNameData }`) || $page.props.auth.user.super_admin"
      class="inline-block pr-4 text-green-400 duration-100 rounded hover:text-green-600"
    >
      <PencilSquareIcon class="w-6 h-6" />
    </Link>
</template>