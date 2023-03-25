<template>
    <h1>Textboxes</h1>
    <DocumentationSection title="Textboxes button colors">
        <div>We can add some classes to modify the color of textboxes
            <template v-for="color in colors">
                <pre class="inline">.{{ color }}</pre>,
            </template>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Textbox v-for="color in colors" :color="color"></Textbox>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Textboxes button labels">
        <div>
            We can add some labels to textboxes
        </div>
        <div class="d-flex gap-4 my-4">
            <Textbox v-for="color in colors" :color="color">{{ color }}</Textbox>
        </div>
        <div>
            <Textbox color="primary" glowing>With glowing effect</Textbox>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Textboxes styling">
        <div>"We can add some classes to modify the style of textboxes
            <pre class="inline">.glowing</pre>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Textbox v-for="color in colors" :color="color" glowing>
                Glowing
            </Textbox>
        </div>
        <div class="my-4">
            We can add some classes to modify the glowing intensity from 0 to 1
            <pre class="inline">{ glowingIntensity: number }</pre>
        </div>
        <div class="d-flex gap-8 mn-4">
            <Textbox v-for="i in 10 " color="primary" glowing :glowingIntensity="i / 10">
                .glowing-{{ i }}
            </Textbox>
        </div>
    </DocumentationSection>
</template>

<script>
import colors from "@/ui/utils/colors";

export default {
    name: "DocumentationInputsTextboxes",
    data() {
        return {
            colors,
        };
    }
};
</script>

<style lang="scss">    
</style>