<template>
  <header>
    <div class="left-section">
      RMMApplication
    </div>

    <div class="right-section">
      
      <div class="help-container">
        <img class="person-icon" src="../icons/question-mark-circle_1.png">
        <div class="tooltip">Help</div>
      </div>

      <div class="account-container" >
        <img class="person-icon" id="person-icon" src="../icons/person-icon.png">
        <div class="tooltip">Account</div>
      </div>
    </div>
  </header>

</template>


<script>
export default {
  name: 'Header',
}
</script>


<style scoped>
  header {
    height: 55px;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  
    position: fixed;
    top: 0;
    left: 200px;
    right: 0;
  
    z-index: 100;
  
    background-color: white;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgb(217, 217, 217);
  }
  
  
  .left-section {
    flex: 1;
    margin-left: 250px;
    margin-right: 35px;
    max-width: 500px;
    display: flex;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
  }
  
  .right-section {
    margin-right: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-shrink: 0;
  }
  
  .help-container, .account-container {
    margin-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .help-container .tooltip,
  .account-container .tooltip {
    position: absolute;
    background-color: rgb(160, 160, 160);
    color: white;
    padding: 8px 8px;
    border-radius: 2px;
    font-size: 12px;
    bottom: -40px;
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
    white-space: nowrap;
  }
  
  .help-container:hover .tooltip,
  .account-container:hover .tooltip {
    opacity: 1;
  }
  
  .person-icon {
    height: 34px;
    cursor: pointer;
  }
  
</style>