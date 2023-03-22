<template>
    <h1>Menus</h1>
    <DocumentationSection title="Dropdopwn menus">
        <Menu :items="items" width="500">
            <template #item-end="{ item }">
                <KeyboardKey v-for="key in item.shortcut" :input="key"></KeyboardKey>
            </template>
        </Menu>
    </DocumentationSection>
</template>

<script>
export default {
    name: "DocumentationMenus",
    data() {
        return {
            items: [
                {
                    label: "New file",
                    icon: "file-earmark",
                    shortcut: ["CTRL", "N"]
                },
                {
                    label: "New folder",
                    icon: "folder-plus",
                },
                {
                    label: "Open",
                    icon: "folder2-open",
                    shortcut: ["CTRL", "O"]
                },
                {
                    divider: true
                },
                {
                    label: "Settings",
                    icon: "sliders",
                    shortcut: ["CTRL", "P"]
                },
                {
                    label: "Extensions",
                    icon: "boxes",
                    shortcut: ["CTRL", "E"]
                },
                {
                    divider: true
                },
                {
                    label: "Exit",
                    icon: "escape",
                    shortcut: ["CTRL", "ALT", "Q"],
                    onclick: () => alert("Leaving app")
                },
            ]
        };
    }
};
</script>

<style lang="scss">    
</style>