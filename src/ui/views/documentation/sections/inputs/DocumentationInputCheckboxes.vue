<template>
    <h1>Checkboxes</h1>
    <DocumentationSection title="Checkboxes button colors">
        <div>We can add some classes to modify the color of checkboxes
            <template v-for="color in colors">
                <pre class="inline">.{{ color }}</pre>,
            </template>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Checkbox v-for="color in colors" :color="color"></Checkbox>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Checkboxes button labels">
        <div>
            We can add some labels to checkboxes
        </div>
        <div class="d-flex gap-4 my-4">
            <Checkbox v-for="color in colors" :color="color">{{ color }}</Checkbox>
        </div>
        <div>
            <Checkbox color="primary" glowing>With glowing effect</Checkbox>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Checkboxes styling">
        <div>"We can add some classes to modify the style of checkboxes
            <pre class="inline">.glowing</pre>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Checkbox v-for="color in colors" :color="color" glowing>
                Glowing
            </Checkbox>
        </div>
        <div class="my-4">
            We can add some classes to modify the glowing intensity from 0 to 1
            <pre class="inline">{ glowingIntensity: number }</pre>
        </div>
        <div class="d-flex gap-8 mn-4">
            <Checkbox v-for="i in 10 " color="primary" glowing :glowingIntensity="i / 10">
                .glowing-{{ i }}
            </Checkbox>
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