<template lang="">
    <div class="d-flex flex-column align-items-center justify-content-center h-100">
        <h1>
            Welcome to JeeSee engine !
        </h1>
        <h2>Chose your view</h2>
        <div class="d-flex flex-column" style="width: 50%">
        <Divider class="my-8"></Divider>
        </div>
        <div class="d-flex gap-8">
            <RouterLink :to="{name: 'UiDocumentation'}">
                <Button rounded glowing class="primary elevation-4 xl">Documentation UI</Button>
            </RouterLink>
            <RouterLink :to="{name: 'Engine'}">
                <Button rounded glowing class="primary elevation-4 xl">Engine</Button>
            </RouterLink>
            <RouterLink :to="{name: 'Layouts'}">
                <Button rounded glowing class="primary elevation-4 xl">Layouts</Button>
            </RouterLink>
            <RouterLink :to="{name: 'DragCode'}">
                <Button rounded glowing class="primary elevation-4 xl">DragCode</Button>
            </RouterLink>
        </div>
    </div>
</template>
<script>
export default {

};
</script>
<style lang="">
    
</style>