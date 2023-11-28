<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BaseRadioButton",
  props: {
    option: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    required: Boolean
  }
})
</script>

<template>
  <label class="label" :for="option.label">
    <input
        type="radio"
        :id="option.label"
        :name="name"
        :value="option.value"
        class="input"
        :checked="$attrs.checked"
        @change="$parent.$emit('input', option.value)"
        :required="required"
    />
    {{ option.label }}
  </label>
</template>

<style scoped lang="scss">
.label {
  display: inline-flex;
  align-items: center;
  gap: .625rem;
  margin: .3125rem 0;
  cursor: pointer;
}
.input {
  height: 1em;
  aspect-ratio: 1;
  border: calc(1em/8) solid #939393;
  padding: calc(1em/8);
  background:
      radial-gradient(farthest-side,#009688 94%,#0000)
      50%/0 0 no-repeat content-box;
  border-radius: 50%;
  outline-offset: calc(1em/10);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  font-size: inherit;
  transition: .3s;

  &:checked {
    border-color: #009688;
    background-size: 100% 100%;
  }
}
</style>