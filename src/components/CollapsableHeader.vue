
<template>
  <div class="collapse-header">
    <a v-b-toggle :href="`#${id}`" @click.prevent>{{ text }}</a>
    <span class="when-opened">
      <font-awesome-icon icon="chevron-down" />
    </span>
    <span class="when-closed">
      <font-awesome-icon icon="chevron-right" />
    </span>
  </div>
</template>

<script>
export default {
  name: "CollapsableHeader",
  props: {
    id: String,
    text: String,
  },
};
</script>

<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
