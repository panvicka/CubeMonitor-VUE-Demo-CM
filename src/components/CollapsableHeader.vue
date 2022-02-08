<template>
  <div class="collapse-header">
    <a v-b-toggle :href="`#${id}`" @click.prevent>{{ text }}</a>
    <span class="when-opened">
      <font-awesome-icon v-if="hidden==true" icon="chevron-down" />
      <font-awesome-icon v-if="hidden==false" icon="chevron-up" />
     </span>
  </div>
</template>

<script>
export default {
  name: "CollapsableHeader",
  props: {
    id: String,
    text: String,
    hidden: Boolean,
  },
};
</script>

<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
