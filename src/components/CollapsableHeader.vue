<template>
  <div class="w-100 d-flex p-1 pl-2 justify-content-between collapse-header">
    <a class="w-100 d-flex justify-content-between align-items-center w-100 text-uppercase" v-b-toggle :href="`#${id}`" @click.prevent
      >{{ text }}
      <font-awesome-icon v-if="hidden == true" icon="chevron-down" />
      <font-awesome-icon v-if="hidden == false" icon="chevron-up" />
    </a>
    <div>
      <font-awesome-icon icon="arrows-alt" class="move-icon" />
    </div>
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
.collapse-header {
  height: 2rem;
}

a {
  letter-spacing: 0.2em;
  color: var(--black);
  margin-top: 1em;
}

a:hover {
  color: var(--black);
  text-decoration: none;
  font-weight: bolder;
}

.move-icon {
  cursor: pointer;
  margin-left: 0.5em;
  margin-top: 0.8em;
}
</style>
