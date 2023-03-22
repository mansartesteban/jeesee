<template>
    <div class="keyboard-key" :class="{ active: isHeld }">
        {{ input }}
    </div>
</template>
<script>
export default {
    name: "KeyboarkKey",
    props: {
        input: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            isHeld: false
        };
    },
    methods: {
        isCurrentKey(key) {
            let currentKey = this.input.toLowerCase();
            if (currentKey == "ctrl") currentKey = "control";
            return key.toLocaleLowerCase() === currentKey;
        }
    },
    mounted() {
        document.addEventListener("keydown", (e) => {
            e.preventDefault();
            if (this.isCurrentKey(e.key)) {
                this.isHeld = true;
            }
        });
        document.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (this.isCurrentKey(e.key)) {
                this.isHeld = false;
            }
        });
    }
};
</script>
<style lang="">
    
</style>