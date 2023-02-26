<template>
  <button class="add-btn">{{ text }}</button>

</template>

<script>

  export default {
    name: "Button",
    props: {
      text: String,
    }
  }
</script>

<style scoped>

</style>