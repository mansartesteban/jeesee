<template>
    <div class="d-flex flex-column gap-2">
        <InputVector3
            label="Position"
            :modelValue="position"
            @update:modelValue="$emit('update:position', $event)"
        ></InputVector3>

        <InputVector3
            label="Rotation"
            :modelValue="rotation"
            @update:modelValue="$emit('update:rotation', $event)"
        ></InputVector3>

        <InputVector3
            label="Scale"
            :modelValue="scale"
            @update:modelValue="$emit('update:scale', $event)"
            :defaultValue="1"
        ></InputVector3>
    </div>
</template>
<script>
import { Vector3 } from 'three';

export default {
    props: {
        position: {
            type: Vector3
        },
        rotation: {
            type: Vector3
        },
        scale: {
            type: Vector3
        }
    }
};
</script>
<style lang="">
    
</style>