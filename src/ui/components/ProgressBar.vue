<template>
    <div :class="classes">
        <div class="progress-bar-indicator" :style="`width: ${progression}%`"></div>
    </div>
</template>

<script>
export default {
    name: "ProgressBar",
    props: {
        color: {
            type: String,
            default: "primary"
        },
        rounded: {
            type: Boolean,
            default: false
        },
        indeterminated: {
            type: Boolean,
            default: false
        },
        progression: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        classes() {
            return [
                "progress-bar",
                this.color,
                { indeterminated: this.indeterminated },
                { rounded: this.rounded }
            ];
        }
    }
};
</script>
<style lang="">
    
</style>