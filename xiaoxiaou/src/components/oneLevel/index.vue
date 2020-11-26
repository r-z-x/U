<template>
  <div>
    <transition enter-active-class="animate__animated animate__slideInRight">
    <router-view />
    </transition>
  <footer-button></footer-button>
  </div>
</template>

<script>
import footerButton from '../../common/footer'
export default {
  components: {
    footerButton
  },
};
</script>


<style lang="" scoped>

</style>