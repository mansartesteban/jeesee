<template>
    <div :class="classes">
        <div
            class="checkbox-box"
            @click="input"
        ></div>
        <div
            v-if="$slots.default || label"
            class="checkbox-label mw-2"
            @click="input"
        >
            <slot>{{ label }}</slot>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        glowing: {
            type: Boolean,
            default: false
        },
        glowingIntensity: {
            type: Number,
            default: .5
        },
        color: {
            type: String,
            default: "primary"
        },
        label: {
            type: String,
            default: null
        }
    },
    computed: {

        classes() {
            return [
                "checkbox",
                this.color,
                { checked: this.modelValue || this.value },
                { glowing: this.glowing },
                this.glowing ? ("glow-" + this.glowingIntensity * 10) : ""
            ];
        },
    },
    data() {
        return {
            value: this.modelValue,
        };
    },
    methods: {
        input() {
            this.value = !this.value;
            this.$emit("update:modelValue", this.value);
        }
    }
};
</script>
<style lang="">
    
</style>