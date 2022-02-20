<template>
  <b-button class="text-left w-100" size="sm" :eventId="eventId" :variant="variant" @click="onClick(eventId)">{{
    text
  }}</b-button>
</template>

<script lang="ts">
/**
 * @displayName Action Button
 */
export default {
  name: "Button",
  props: {
    // display text
    text: {
      default: "Define a text!",
      type: String,
    },

    /**
     * Buttton Bootstrap variant
     * @values primary, secondary, success, danger, warning, info, light, dark
     */
    variant: {
      default: "primary",
      type: String,
    },

    // Button ID
    eventId: {
      required: true,
      type: String,
    },
  },
  methods: {
    onClick(eventId) {
      /**
       * Gets called when the button is clicked
       * @property {String} eventId button ID
       */
      this.$emit("btn-click", eventId);
    },
  },
};
</script>

<docs>
This button component is sending the ID of itself when clicked. Used to triggering pre-defined events.
</docs>
