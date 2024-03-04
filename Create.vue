
<script setup>
import { Link, usePage } from '@inertiajs/vue3'

const page = usePage();
const prefix = page.props.prefix || 'backend';

</script>

<template>
  <Link
    :href="route(`${ prefix }.${ $page.props.routeNameData }.create`)"
    v-if="$page.props.permissions.includes(`create ${ $page.props.routeNameData }`) || $page.props.auth.user.super_admin"
  >
    <a class="px-4 py-2 mr-3 text-sm text-green-600 transition border border-green-300 rounded-full hover:bg-green-600 hover:text-white hover:border-transparent">
        {{ $page.props.langs.create }}
    </a>
  </Link>
</template>