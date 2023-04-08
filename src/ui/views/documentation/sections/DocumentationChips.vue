<template>
    <h1>Chips</h1>
    <DocumentationSection title="Colors">
        <div>
            We can add some classes to modify the color of buttons
            <template v-for="color in colors">
                <pre class="inline">.{{ color }}</pre>,
            </template>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Chip v-for="color in colors" :color="color"></Chip>
        </div>
    </DocumentationSection>

    <DocumentationSection title="Colors">
        <div>
            We can add some classes to add glowing effect
        </div>
        <div class="d-flex gap-4 mn-4">
            <Chip v-for="color in colors" :color="color" glowing></Chip>
        </div>
        <div class="mn-4">
            We can add some classes to modify glowing intensity
        </div>
        <div class="d-flex gap-4 mn-4">
            <Chip v-for="i in 10" color="primary" :glowingIntensity="i / 10" glowing></Chip>
        </div>
    </DocumentationSection>
</template>

<script>
import colors from '@/ui/utils/colors';

export default {
    name: "DocumentationChips",
    data() {
        return {
            colors
        };
    }
};
</script>

<style lang="scss">    
</style>