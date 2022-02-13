<template>
  <div class="d-flex flex-column align-items-center rounded mt-1 mb-1 collapsable-container">
    <collapsable-header :id="id" :text="titleText" :hidden="hidden"></collapsable-header>
    <collapsable-content :id="id" @hide="setHidden" @show="setShown" class="collapsable-content">
      <slot />
    </collapsable-content>
  </div>
</template>

<script>
import CollapsableContent from "./CollapsableContent.vue";
import CollapsableHeader from "./CollapsableHeader.vue";

export default {
  data: () => {
    return {
      hidden: true,
    };
  },
  name: "Collapsable",
  props: {
    id: String,
    titleText: String,
  },
  components: {
    "collapsable-content": CollapsableContent,
    "collapsable-header": CollapsableHeader,
  },
  methods: {
    setHidden() {
      this.hidden = true;
    },
    setShown() {
      this.hidden = false;
    },
  },
};
</script>

<style scoped>
.collapsable-container {
  background-color: var(--light-gray);
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
    rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
</style>
