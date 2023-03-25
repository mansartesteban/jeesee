<template>
    <div :class="classes">
        <slot name="prepend-icon">
            <i v-if="prependIcon && !icon" :class="iconName(prependIcon)" class="bi"></i>
        </slot>
        <slot name="icon">
            <i v-if="icon" :class="iconName(icon)" class="bi"></i>
        </slot>
        <div v-if="$slots.default" :class="{ 'me-2': appendIcon && !icon, 'mw-2': prependIcon || icon }">
            <slot></slot>
        </div>
        <slot name="append-icon">
            <i v-if="appendIcon && !icon" :class="iconName(appendIcon)" class="bi"></i>
        </slot>
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
                "btn",
                this.color,
                this.elevation ? ("elevation-" + this.elevation) : "",
                { active: this.active },
                { rounded: this.rounded },
                { pill: this.pill },
                { circle: this.circle },
                { hoverable: this.hoverable },
                { outlined: this.outlined },
                { borderless: this.borderless },
                { glowing: this.glowing },
                this.glowing && this.glowingIntensity ? this.glowingIntensity * 10 : ""
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