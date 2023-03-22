<template>
    <h1>Switches</h1>
    <DocumentationSection title="Switches button colors">
        <div>We can add some classes to modify the color of switches
            <template v-for="color in colors">
                <pre class="inline">.{{ color }}</pre>,
            </template>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Switch v-for="color in colors" :color="color"></Switch>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Switches button labels">
        <div>
            We can add some labels to switches
        </div>
        <div class="d-flex gap-4 my-4">
            <Switch v-for="color in colors" :color="color">{{ color }}</Switch>
        </div>
        <div>
            <Switch color="primary" glowing>With glowing effect</Switch>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Switches styling">
        <div>"We can add some classes to modify the style of switches
            <pre class="inline">.glowing</pre>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Switch v-for="color in colors" :color="color" glowing>
                Glowing
            </Switch>
        </div>
        <div class="my-4">
            We can add some classes to modify the glowing intensity from 0 to 1
            <pre class="inline">{ glowingIntensity: number }</pre>
        </div>
        <div class="d-flex gap-8 mn-4">
            <Switch v-for="i in 10 " color="primary" glowing :glowingIntensity="i / 10">
                .glowing-{{ i }}
            </Switch>
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