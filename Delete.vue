
<script setup>
import { router, Link, usePage } from '@inertiajs/vue3'
import { TrashIcon } from "@heroicons/vue/24/solid"
import SuccessAlert from '@/Services/SuccessAlert'

import { confirmDelete } from '@/Services/confirmDelete';

const props = defineProps({
  item: { type: Object }
})

const page = usePage();

const onDelete = async (id) => {
    if(await confirmDelete(page.props.langs)){
        router.delete(route(`backend.${page.props.routeNameData}.destroy`, id), SuccessAlert)
    }
}
</script>

<template>
  <a
    href="#"
    @click="onDelete(item.id)"
    v-if="$page.props.permissions.includes(`delete ${ $page.props.routeNameData }`) || $page.props.auth.user.super_admin"
    class="float-left pr-4 py-2 text-red-400 duration-100 rounded hover:text-red-600"
  >
      <TrashIcon class="w-6 h-6" />
  </a>
</template>