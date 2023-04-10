<template>
    <div class="input-vector3">
        <div v-if="label">{{ label }}</div>
        <div class="d-flex flex-nowrap gap-2">
            <InputNumber
                :modelValue="modelValue?.x"
                @update:modelValue="update($event, 'x')"
                label="X"
            ></InputNumber>
            <InputNumber
                :modelValue="modelValue?.y"
                @update:modelValue="update($event, 'y')"
                label="Y"
            ></InputNumber>
            <InputNumber
                :modelValue="modelValue?.z"
                @update:modelValue="update($event, 'z')"
                label="Z"
            ></InputNumber>
            <Button
                icon="arrow-counterclockwise"
                @click="update(0, 'xyz')"
            ></Button>
        </div>
    </div>
</template>
<script>
import { Vector3 } from 'three';

export default {
    props: {
        modelValue: {
            type: Vector3
        },
        label: {
            type: String
        }
    },
    data() {
        return {
            value: this.modelValue
        };
    },
    methods: {
        update(value, prop) {
            if (!this.value) {
                this.value = this.modelValue;
            }
            prop.split("").forEach(k => {
                this.value[k] = value;
            });
            this.$emit("update:modelValue", this.value);
        }
    },
    mounted() {
        this.value = this.modelValue;
    }
};
</script>
<style lang="">
    
</style>