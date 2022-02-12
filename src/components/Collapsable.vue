<template>
  <div class="collapsable-container">
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
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  /* padding: 1em; */
  background-color: rgba(236, 236, 236, 0.705);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
    rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  /* justify-content: space-evenly; */
  align-items: center;
  width: 100%;
  /* flex-wrap: wrap; */
  height: auto; 
}


</style>
