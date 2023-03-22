<template>
    <div class="documentation-section ms-8">
        <h2>{{ title }}</h2>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "DocumentationSection",
    props: {
        title: String
    }
};
</script>
