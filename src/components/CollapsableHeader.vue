<template>
  <div class="collapse-header">
    <a v-b-toggle :href="`#${id}`" @click.prevent>{{ text }}</a>
  </div>
</template>

<script>
export default {
  name: 'CollapsableHeader',
  props: {
    id: String,
    text: String,
  },
};
</script>
