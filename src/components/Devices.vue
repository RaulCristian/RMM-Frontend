<template>
  <div :key="device.id" v-for="device in devices">
    <Device 
      @update-device="$emit('update-device', device.id, device.uniqueDeviceIdentifier)"
      @delete-device="$emit('delete-device', device.id)" 
      @get-status="$emit('get-status', device.id)"
      :device="device" 
    />
  </div>

</template>

<script>
import Device from './Device';

  export default {
    name: 'Devices',
    props: {
      devices: Array
    },
    components: {
    Device
    },
    emits: ['delete-device', 'update-device', "get-status"]
  }
</script>
