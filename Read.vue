
<script setup>
import { Link } from '@inertiajs/vue3'
import { EyeIcon } from "@heroicons/vue/24/solid"
const props = defineProps({
  item: { type: Object },
  permissions: { type: Boolean, default: true },
  LinkHref: { type: String, default: null },
  permissionsData: { type: String, default: null },
})

</script>

<template>
  <Link
    :href="LinkHref || route(`backend.${ $page.props.routeNameData }.show`, item.id)"
    v-if="!permissions || (permissions && ($page.props.permissions.includes(`read ${ permissionsData || $page.props.routeNameData }`) || $page.props.auth.user.super_admin))"
    class="inline-block pr-4 duration-100 rounded hover:text-green-600"
  >
    <EyeIcon class="w-6 h-6" />
  </Link>
</template>