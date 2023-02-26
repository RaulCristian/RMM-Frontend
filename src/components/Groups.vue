<template>
  <div :key="group.id" v-for="group in groups">
    <Group 
      @update-group="$emit('update-group', group.id, group.name)"
      @delete-group="$emit('delete-group', group.id)" 
      :group="group" 
    />
  </div>

</template>

<script>
import Group from './Group';

  export default {
    name: 'Groups',
    props: {
      groups: Array
    },
    components: {
    Group
    },
    emits: ['delete-group', 'update-group']
  }
</script>
