<template>
  <div class="group-row">
    <div data-label="Group ID" class="col col-1">{{ group.id }}</div>
    <div  data-label="Group Name" class="col col-2">{{ group.name }}</div>
    <div class="actions-container">
      <div class="btn-modal">
        <Button class="update-btn" @click="onUpdate(group.id, group.name)" />
        <div class="btn-tooltip">Update</div>
      </div>
      <div class="btn-modal">
        <Button class="delete-btn" @click="onDelete(group.id)" />
        <div class="btn-tooltip">Delete</div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

  export default {
    name: "Group",
    props: {
        group: Object
    },
    components: { Button, Button },
    methods: { 
      onDelete(id) {
        this.$emit('delete-group', id);
      },
      onUpdate(id, name) {
        this.$emit('update-group', id, name);
      }
    }
}
</script>


<style scoped>
  .group-row {
    width: 1000px;
    display: flex;
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
    margin-bottom: 10px;
    transition: background-color 0.05s;
  }

  .group-row:hover {
    background-color:rgba(236, 5, 5);
  }

  .col {
    margin-top: 24px;
  }

  .col-1 {
    flex-basis: 10%;
    margin-left: 50px;
  }

  .col-2 {
    margin-left: 100px;
    flex-basis: 90%;
  }

  .actions-container {
    display: flex;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 40px;
    flex-basis: 20%;
    align-items: center;
    justify-content: center;
  }

  .actions-cell {
    display: flex;
    flex-direction: row;
  }
  
  .update-btn {
    border-radius: 2px;
    background: url(../icons/pencil-icon.png) no-repeat;
    background-size: 90%;
    background-position: center;
    width: 50px;
    height: 50px;
    background-color: rgb(72, 210, 72);
    transition: background-color 0.15ms;

    cursor: pointer;
  }
  
  .update-btn:active {
    background: url(../icons/pencil-icon.png) no-repeat;
  }
  
  .update-btn:hover {
    background-color: rgb(72, 160, 72);
  }

  .delete-btn {
    border-radius: 2px;
    background: url(../icons/garbage-icon.png) no-repeat;
    background-size: 90%;
    background-position: center;
    width: 50px;
    height: 50px;
    background-color: rgb(210, 20, 20);
    transition: background-color 0.15ms;

    cursor: pointer;
  }
  
  .delete-btn:active {
    background: url(../icons/garbage-icon.png) no-repeat;
  }
  
  .delete-btn:hover {
    background-color: rgb(160, 20, 20);
  }

  .btn-modal {
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .btn-modal .btn-tooltip {
    position: absolute;
    background-color: rgb(160, 160, 160);
    color: white;
    border-radius: 2px;
    font-size: 12px;
    padding: 3px 1px;
    bottom: -24px;
    width: 100%;
    text-align: center;
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
    white-space: nowrap;
  }
  
  .btn-modal:hover .btn-tooltip {
    opacity: 1;
  }
  
  
  
</style>