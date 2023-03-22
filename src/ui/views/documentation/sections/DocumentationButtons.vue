<template>
    <h1>Buttons</h1>
    <DocumentationSection title="Buttons colors">
        <div>
            We can add some classes to modify the color of buttons
            <template v-for="color in colors">
                <pre class="inline">.{{ color }}</pre>,
            </template>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Button v-for="color in colors" :color="color">Button</Button>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Buttons with icons">
        <div>
            We can add the properties
            <pre class="inline">icon</pre>,
            <pre class="inline">prepend-icon</pre>,
            <pre class="inline">append-icon</pre>
            to the button like this :
            <pre class="code-bloc" name="code">{{ `<Button \nicon="file-earmark-code"\n></Button>` }}</pre>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Button color="primary" icon="file-earmark-code"></Button>
            <Button color="primary" appendIcon="facebook    "></Button>
            <Button color="primary" prependIcon="link-45deg">toto</Button>
            <Button color="primary" appendIcon="file-earmark-code">toto</Button>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Buttons shapes">
        <div>We can add some classes to modify the shape of buttons
            <pre class="inline">.rounded</pre>,
            <pre class="inline">.pill</pre>,
            <pre class="inline">.circle</pre>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Button color="primary">Default</Button>
            <Button rounded color="error">Default</Button>
            <Button pill color="info">Default</Button>
            <Button circle color="success">Default</Button>
        </div>
    </DocumentationSection>
    <DocumentationSection title="Buttons sizes">
        <div>We can add some classes to modify the size of buttons
            <pre class="inline">.xs</pre>,
            <pre class="inline">.sm</pre>,
            <pre class="inline">.lg</pre>,
            <pre class="inline">.xl</pre>
        </div>
        <div class="d-flex align-items-start gap-4 mn-4">
            <Button color="primary" class="xs">e<u>X</u>tra <u>S</u>mall button</Button>
            <Button color="primary" class="sm"><u>SM</u>all button</Button>
            <Button color="primary" class="">Default</Button>
            <Button color="primary" class="lg"><u>L</u>ar<u>G</u>e button</Button>
            <Button color="primary" class="xl">e<u>X</u>tra lar<u>G</u>e button</Button>
        </div>
    </DocumentationSection>
</template>

<script>
import colors from '@/ui/utils/colors';

export default {
    name: "DocumentationButtons",
    data() {
        return {
            colors
        };
    }
};
</script>

<style lang="scss">    
</style>