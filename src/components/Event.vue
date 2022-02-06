<template>
  <div class="flex-container-item wider flex-container-item-flex ">
    <span>
      <b>{{ event.eventCode }}</b> {{ event.eventDescription }}
    </span>
    <span
      class="state"
      :class="event.eventActivated ? 'state-on' : 'state-off'"
      >{{ event.eventActivated ? "ON" : "OFF" }}</span
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "event",
  props: {
    event: Object,
  },
};
</script>

<style scoped>
.state-on {
  color: green;
}

.state-off {
  color: rgb(196, 4, 4);
}

.disabled {
  opacity: 50%;
  background-color: grey;
}
</style>
