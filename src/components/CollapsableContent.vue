<template>
  <!-- wrapping collapsable content into div prevents animation glitch -->
  <div>
    <b-collapse :id="id" @hide="$emit('hide')" @show="$emit('show')">
      <!-- @slot The content -->
      <slot />
    </b-collapse>
  </div>
</template>

<script>
/**
 * @displayName Collapsable content
 */
export default {
  name: "CollapsableContent",
  props: {
    // element ID, must be unique
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<docs>
Content can be hidden by clicking of the [header](#collapsableheader).
 </docs>
