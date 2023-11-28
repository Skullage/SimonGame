<script>
import {defineComponent} from 'vue'
import BaseRadioButton from "@/components/BaseRadioButton.vue";

export default defineComponent({
  name: "BaseRadioButtonGroup",
  components: {BaseRadioButton},
  props: {
    label: String,
    name: {
      type: String,
      required: true
    },
    required: Boolean,
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
})
</script>

<template>
  <fieldset>
    <legend class="legend" :class="{'required': required}">{{ label }}</legend>
    <div class="options-list">
      <base-radio-button
          v-for="(option, index) in options"
          :name="name"
          :option="option"
          :key="index"
          :checked="option.value === $attrs.value"
          :required="required"
      />
    </div>
  </fieldset>

</template>

<style scoped lang="scss">
.required:after {
  content: "*";
}
.legend {
  font-size: 1.4rem;
}
.options-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  font-size: 1.1rem;
}
</style>