<template>
    <div class="documentation p-6 d-flex flex-column flex">
        <Tabs :tabs="tabs" vertical class="h-100"></Tabs>
    </div>
</template>

<script>
import DocumentationAlerts from './sections/DocumentationAlerts';
import DocumentationButtons from './sections/DocumentationButtons';
import DocumentationCards from './sections/DocumentationCards';
import DocumentationInputs from './sections/DocumentationInputs';
import DocumentationMenus from './sections/DocumentationMenus';
import DocumentationProgressBars from './sections/DocumentationProgressBars';
import DocumentationTexts from './sections/DocumentationTexts';
import DocumentationTreeView from './sections/DocumentationTreeView.vue';
import DocumentationChips from './sections/DocumentationChips.vue';


export default {
    name: "Documentation",
    data() {
        return {
            tabs: [
                {
                    header: "Chips",
                    content: DocumentationChips
                },
                {
                    header: "TreeView",
                    content: DocumentationTreeView
                },
                {
                    header: "Inputs",
                    content: DocumentationInputs
                },
                {
                    header: "Menus",
                    content: DocumentationMenus
                },
                {
                    header: "Cards",
                    content: DocumentationCards
                },
                {
                    header: "ProgressBars",
                    content: DocumentationProgressBars
                },
                {
                    header: "Buttons",
                    content: DocumentationButtons
                },
                {
                    header: "Alerts",
                    content: DocumentationAlerts
                },
                {
                    header: "Texts",
                    content: DocumentationTexts
                },

            ]
        };
    }
};
</script>

<style></style>