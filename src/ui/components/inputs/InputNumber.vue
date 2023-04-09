<template>
    <div class="input-number d-flex flex-nowrap gap-2">
        <div v-if="label">{{ label }}</div>
        <input
            type="text"
            class="flex"
            :value="focused ? value : modelValue"
            @input="onUpdate"
            @focus="onFocus"
            @keypress.enter="onEnter"
            @keydown.left="debug"
            @keydown.up="onArrowUp"
            @keydown.down="onArrowDown"
            @blur="onBlur"
        />
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: [String, Number]
        },
        label: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            value: 0,
            focused: false
        };
    },
    methods: {
        onArrowUp(e) {
            let increaseValue = 1;
            if (e.shiftKey) increaseValue = 10;
            if (e.ctrlKey) increaseValue = 100;
            if (e.altKey) increaseValue = .1;

            this.update(+this.value + increaseValue);
        },
        onArrowDown(e) {
            let increaseValue = -1;
            if (e.shiftKey) increaseValue = -10;
            if (e.ctrlKey) increaseValue = -100;
            if (e.altKey) increaseValue = -.1;

            this.update(+this.value + increaseValue);
        },
        onUpdate(val) {
            val.target.value = val.target.value.replace(/[a-z]/i, "");
            this.value = val.target.value;
        },
        onFocus() {
            this.focused = true;
            this.value = this.modelValue;
        },
        onBlur() {
            this.focused = false;
            this.update();
        },
        onEnter() {
            try {
                this.value = parseFloat(eval(this.value));
                this.update();
            } catch (error) { // If statment is not correct, set the value back to original one
                this.value = this.modelValue;
            }
        },
        update(val = null) {
            this.value = val !== null ? val : (this.value || 0);
            this.$emit("update:modelValue", this.value);
        }
    }
};
</script>

<style lang="scss" scoped>
.input-number {
    span {
        width: -webkit-fill-available;
    }
}
</style>