<template>
    <h1>Radio buttons</h1>
    <DocumentationSection title="Radio button colors">
        <div>We can add some classes to modify the color of radio buttons
            <template v-for="color in colors">
                <pre class="inline">.{{ color }}</pre>,
            </template>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Radio v-for="color in colors" :color="color"></Radio>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Radio button labels">
        <div>
            We can add some labels to radio buttons
        </div>
        <div class="d-flex gap-4 my-4">
            <Radio v-for="color in colors" :color="color">{{ color }}</Radio>
        </div>
        <div>
            <Radio color="primary" glowing>With glowing effect</Radio>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Radio styling">
        <div>"We can add some classes to modify the style of radio buttons
            <pre class="inline">.glowing</pre>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Radio v-for="color in colors" :color="color" glowing>
                Glowing
            </Radio>
        </div>
        <div class="my-4">
            We can add some classes to modify the glowing intensity from 0 to 1
            <pre class="inline">{ glowingIntensity: number }</pre>
        </div>
        <div class="d-flex gap-8 mn-4">
            <Radio v-for="i in 10 " color="primary" glowing :glowingIntensity="i / 10">
                .glowing-{{ i }}
            </Radio>
        </div>
    </DocumentationSection>
</template>

<script>
import colors from "@/ui/utils/colors";

export default {
    name: "DocumentationInputsRadios",
    data() {
        return {
            colors,
        };
    }
};
</script>

<style lang="scss">    
</style>