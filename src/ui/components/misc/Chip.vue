<template>
    <div :class="classes"></div>
</template>
<script>
export default {
    props: {
        color: {
            type: String,
            default: "primary",
        },
        glowing: {
            type: Boolean,
            default: false
        },
        glowingIntensity: {
            type: [String, Number],
            default: .5
        }
    },
    computed: {
        classes() {
            return [
                "chip",
                "p-1",
                this.color,
                { glowing: this.glowing },
                this.glowing ? ("glow-" + this.glowingIntensity * 10) : ""
            ];
        }
    }
};
</script>
<style lang="">
    
</style>