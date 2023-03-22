<template>
    <div :class="classes">
        <i v-if="prependIcon && !icon" :class="iconName(prependIcon)" class="bi"></i>
        <i v-if="icon" :class="iconName(icon)" class="bi"></i>
        <div v-if="$slots.default" :class="{ 'me-2': appendIcon && !icon, 'mw-2': prependIcon || icon }">
            <slot></slot>
        </div>
        <i v-if="appendIcon && !icon" :class="iconName(appendIcon)" class="bi"></i>
    </div>
</template>
<script>
export default {
    props: {
        hoverable: {
            type: Boolean,
            default: true
        },
        elevation: {
            type: [Number, String],
            default: undefined
        },
        rounded: {
            type: Boolean,
            default: false
        },
        pill: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        borderless: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: ""
        },
        active: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: null
        },
        prependIcon: {
            type: String,
            default: null
        },
        appendIcon: {
            type: String,
            default: null
        }
    },
    computed: {
        classes() {
            return [
                "btn",
                this.color,
                this.elevation ? ("elevation-" + this.elevation) : "",
                { active: this.active },
                { rounded: this.rounded },
                { pill: this.pill },
                { circle: this.circle },
                { hoverable: this.hoverable },
                { outlined: this.outlined },
                { borderless: this.borderless }
            ];
        }
    },
    methods: {
        iconName(icon = "") {
            // Externalize prefix icon to settings objects
            return icon.startsWith("bi-") ? icon : "bi-" + icon;
        }
    }
};
</script>