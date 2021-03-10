<template>
  <div class="flex justify-center items-center">
    <input
      type="number"
      class="form-control w-16 p-3 border-none rounded-none text-center order-2"
      ref="input"
      :name="name"
      :value="numericValue"
      :placeholder="placeholder"
      :max="max"
      :min="min"
      :autofocus="autofocus"
      :disabled="disabled"
      :readonly="readonly"
      @input="inputHandler($event.target.value)"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    >
    <button
      type="button"
      v-if="controls"
      class="btn btn-blue p-3 border-none rounded-tr-none rounded-br-none disabled:opacity-50 disabled:cursor-not-allowed order-1 relative"
      :disabled="disabled || numericValue <= min"
      @mousedown="start(decrement)"
      @touchstart="$event.preventDefault(); start(decrement)"
      @touchend="$event.preventDefault(); stop($event)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
      </svg>
    </button>
    <button
      type="button"
      v-if="controls"
      class="btn btn-blue p-3 border-none rounded-tl-none rounded-bl-none disabled:opacity-50 disabled:cursor-not-allowed order-3"
      :disabled="disabled || numericValue >= max"
      @mousedown="start(increment)"
      @touchstart="$event.preventDefault(); start(increment)"
      @touchend="$event.preventDefault(); stop($event)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </button>
  </div>
</template>
<script>
const timeInterval = 100

export default {
  name: 'numeric-input',
  props: {
    name: String,
    value: Number,
    placeholder: String,
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      validator (val) {
        return val >= 0 && Number.isInteger(val)
      }
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      numericValue: null,
      interval: null,
      startTime: null,
      handler: Function
    }
  },
  watch: {
    // Watch for value change
    value: {
      immediate: true,
      // handle the changed value
      handler (val) {
        let newValue = val
        if (newValue) {
          newValue = this.toPrecision(newValue, this.precision)
          if (newValue >= this.max) {
            newValue = this.max
          }
          if (newValue <= this.min) {
            newValue = this.min
          }
          if (newValue !== val) {
            this.$emit('input', newValue)
          }
        }
        this.numericValue = newValue
      }
    }
  },
  methods: {
    /**
     * Function convert value to number
     * @param val
     * @returns {number | Number}
     */
    toNumber (val) {
      let num = parseFloat(val)
      if (isNaN(val) || !isFinite(val)) {
        num = 0
      }
      return num
    },
    /**
     * Function to return fixed decimal precision of input val
     * @param val
     * @param precision
     * @returns {number | Number}
     */
    toPrecision (val, precision) {
      return precision !== undefined ? parseFloat(val.toFixed(precision)) : val
    },
    /**
     * Increment the current numeric value
     */
    increment () {
      if (!this.readonly) this.updateValue(this.toNumber(this.numericValue) + this.step)
    },
    /**
     * Decrement the current numeric value
     */
    decrement () {
      if (!this.readonly) this.updateValue(this.toNumber(this.numericValue) - this.step)
    },
    /**
     * Handle value on Input
     */
    inputHandler (val) {
      this.updateValue(this.toNumber(val), val)
    },
    /**
     * Update value on operation performed
     * @param val
     */
    updateValue: function (val, strVal = null) {
      const oldVal = this.numericValue
      val = this.toPrecision(val, this.precision)
      if (val >= this.max) {
        val = this.max
      }
      if (val <= this.min) {
        val = this.min
      }
      if (val === oldVal) {
        this.$refs.input.value = strVal && val === this.toNumber(strVal) ? strVal : val
        return
      }
      this.numericValue = val
      this.$emit('input', val)
    },
    /**
     *  Start a repetitive call to increment and decrement method after a timeInterval on mousedown event and will stop on mouseup event on controls
     * @param handler - increment or decrement method
     */
    start (handler) {
      document.addEventListener('mouseup', this.stop)
      this.startTime = new Date()
      this.handler = handler
      clearInterval(this.interval)
      this.interval = setInterval(handler, timeInterval)
    },
    /**
     * clear interval on mouseup event and remove the listener
     * @param evt - event to be removed
     */
    stop (evt) {
      document.removeEventListener(evt.type, this.stop)
      if (new Date() - this.startTime < timeInterval) {
        this.handler()
      }
      clearInterval(this.interval)
      this.interval = null
      this.handler = null
      this.startTime = null
      if (this.value !== this.numericValue) this.$emit('change', this.numericValue)
    },
    /**
     * On blur event trigger
     * @param event - blur event on input
     */
    onBlur (event) {
      this.$emit('blur', event)
    },
    /**
     * On focus event trigger on input
     * @param event
     */
    onFocus (event) {
      this.$emit('focus', event)
    },
    /**
     * On change event trigger on input
     * @param event
     */
    onChange (event) {
      this.$emit('change', this.numericValue)
    },
    /**
     * focus method to set the focus on input
     */
    focus () {
      if (!this.disabled) {
        this.$refs.input.focus()
      }
    },
    /**
     * blur to be trigger on input
     */
    blur () {
      this.$refs.input.blur()
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.interval = null
    this.handler = null
    this.startTime = null
  }
}
</script>
<style scoped>
  input[type=number] {
    appearance: textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
</style>
