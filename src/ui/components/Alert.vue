<template>
    <div :class="classes" ref="alert">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
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
        }
    },
    computed: {
        classes() {
            return [
                "alert",
                "elevation-8",
                this.color,
                { glowing: this.glowing },
                this.glowing ? ("glow-" + this.glowingIntensity * 10) : ""
            ];
        }
    },
    mounted() {
        this.$refs.alert.addEventListener("contextMenu", (e) => {
            e.preventDefault();

        });
    }
};
</script>
<style lang="">
    
</style>