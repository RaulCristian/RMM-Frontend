<template>
  <div :key="company.id" v-for="company in companies">
    <Company 
      @update-company="$emit('update-company', company.id, company.name)"
      @delete-company="$emit('delete-company', company.id)" 
      :company="company" 
    />
  </div>

</template>

<script>
import Company from './Company';

  export default {
    name: 'Companies',
    props: {
      companies: Array
    },
    components: {
    Company
    },
    emits: ['delete-company', 'update-company']
  }
</script>
