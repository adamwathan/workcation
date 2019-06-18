<template>
  <div class="relative">
    <button @click="toggle" type="button" class="block focus:outline-none" @focus="buttonHasFocus = true" @blur="buttonHasFocus = false">
      <slot name="trigger" :hasFocus="buttonHasFocus" :isOpen="isOpen"></slot>
    </button>
    <div :class="[isOpen ? 'block' : 'hidden']">
      <button @click="isOpen = false" type="button" class="z-30 block fixed inset-0 w-full h-full cursor-default"></button>
      <div class="absolute z-40 right-0">
        <slot name="dropdown"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      buttonHasFocus: false,
      isOpen: false,
    }
  },
  mounted() {
    const onEscape = (e) => {
      if (!this.isOpen || e.key !== 'Escape') {
        return
      }
      this.isOpen = false
    }
    document.addEventListener('keydown', onEscape)

    this.$on('hook:destroyed', () => {
      document.removeEventListener('keydown', onEscape)
    })
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
