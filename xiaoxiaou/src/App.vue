<template>
  <div id="app">
    <transition enter-to-class="animate__animated animate__slideInDown">
        <router-view />
    </transition>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
