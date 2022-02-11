<template>
  <div class="collapse-header">
    <a v-b-toggle :href="`#${id}`" @click.prevent
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 2rem;
  padding: 0.2em;
  padding-left: 0.5em;
  border-radius: 10px 10px 0px 0px;
}

a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 1em;
  color: black;
  margin-top: 1em;
}

a:hover {
  text-decoration: none;
  font-weight: bolder;
}

.move-icon {
  cursor: pointer;
  margin-left: 0.5em;
  margin-top: 0.8em;
}
</style>
