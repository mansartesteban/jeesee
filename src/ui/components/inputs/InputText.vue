<template>
    <input
        type="text"
        :value="focused ? value : modelValue"
        @input="onUpdate"
        @focus="onFocus"
        @blur="onBlur"
    />
</template>

<script>
export default {
    name: "InputText",
    props: {
        modelValue: {
            type: [String, Number]
        },
        type: {
            type: String
        }
    },
    data() {
        return {
            value: this.modelValue,
            focused: false
        };
    },
    methods: {
        onUpdate(val) {
            this.value = val.target.value;
            this.$emit("update:modelValue", val.target.value);
        },
        onFocus() {
            this.focused = true;
        },
        onBlur() {
            this.focused = false;
        }
    }
};
</script>
<style lang="">
    
</style>