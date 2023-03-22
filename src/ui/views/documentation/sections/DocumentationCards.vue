<template>
    <h1>Cards</h1>
    <DocumentationSection title="Card colors">
        <Card v-for="color in colors" :color="color" class="my-4">
            <template #card-header>Header ?</template>
            <template #card-body>Body ?</template>
            <template #card-footer>Footer ?</template>
        </Card>
    </DocumentationSection>
</template>

<script>
import colors from '@/ui/utils/colors';

export default {
    name: "DocumentationCards",
    data() {
        return {
            colors
        };
    }
};
</script>

<style lang="scss">    
</style>