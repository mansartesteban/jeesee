<template>
    <h1>Inputs & controls</h1>
    <Tabs :tabs="tabs"></Tabs>
</template>

<script>
import DocumentationInputRadios from './inputs/DocumentationInputRadios.vue';
import DocumentationInputSwitches from './inputs/DocumentationInputSwitches.vue';
import DocumentationInputCheckboxes from './inputs/DocumentationInputCheckboxes.vue';
import DocumentationInputTextboxes from './inputs/DocumentationInputTextboxes.vue';

export default {
    name: "DocumentationInputs",
    data() {
        return {
            tabs: [
                {
                    header: "Textboxes",
                    content: DocumentationInputTextboxes,
                },
                {
                    header: "Switches",
                    content: DocumentationInputSwitches,
                },
                {
                    header: "Checkboxes",
                    content: DocumentationInputCheckboxes,
                },
                {
                    header: "Radios",
                    content: DocumentationInputRadios,
                },
            ]
        };
    }
};
</script>

<style lang="scss">    
</style>