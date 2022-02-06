<template>
  <div>
    <collapsable-header :id="id" :text="titleText"></collapsable-header>
    <collapsable-content :id="id">
      <slot />
    </collapsable-content>
  </div>
</template>

<script>
import CollapsableContent from './CollapsableContent.vue';
import CollapsableHeader from './CollapsableHeader.vue';

export default {
  name: 'Collapsable',
  props: {
    id: String,
    titleText: String,
  },
  components: {
    'collapsable-content': CollapsableContent,
    'collapsable-header': CollapsableHeader,
  },
};
</script>
