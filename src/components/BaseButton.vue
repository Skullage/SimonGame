<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BaseButton",
  props: {
    sound: {
      type: String,
      required: true
    },
    bgcolor: {
      type: String,
      required: true
    },
    timeoutTime: Number,
    disabled: Boolean
  },
  data() {
    return {
      isShine: false
    }
  },
  methods: {
   clickBtn() {
      let audio = new Audio(require(`@/assets/audio/${this.sound}`))
      audio.play()
      this.isShine = true;
      setTimeout(() => {
        this.isShine = false;
      }, 500)

    },
    click() {
      this.clickBtn()
      this.$emit('click')
    }
  }
})
</script>

<template>
  <button class="btn" :disabled="disabled" @click="click" :style="`background-color: ${bgcolor}`" :class="{'shine': isShine}">

  </button>
</template>

<style scoped lang="scss">
.btn {
  border: 2px solid transparent;
  cursor: pointer;
  opacity: .5;

  &:hover {
    border: 2px solid black;
  }
}
.shine {
  opacity: .9;
}
</style>