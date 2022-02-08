<template>
  <div>
    <collapsable-header :id="id" :text="titleText" :hidden="hidden"></collapsable-header>
    <collapsable-content :id="id" @hide="setHidden" @show="setShown">
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
      console.log(this.hidden);
    },
    setShown() {
      this.hidden = false;
      console.log(this.hidden);
    },
  },
};
</script>
