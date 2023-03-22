<template>
    <h1>Documentation Alerts</h1>
    <DocumentationSection title="Alert colors (severity)">
        <div>
            We can add some classes to modify the colors of alerts
            <template v-for="color in colors">
                <pre class="inline">.{{ color }}</pre>,
            </template>
        </div>

        <div class="d-flex gap-4 mn-4">
            <Alert v-for="color in colors" :color="color">
                Hey ! I am an alert to show you something special, you should take a look
            </Alert>
        </div>
    </DocumentationSection>

    <DocumentationSection title="Alert styling">
        <div>"We can add some classes to modify the style of alerts "
            <pre class="inline">.glowing</pre>
        </div>
        <div class="d-flex gap-4 mn-4">
            <Alert v-for="color in colors" :color="color" glowing>
                Hey ! I am an alert to show you something special, you should take a look
            </Alert>
        </div>
        <div class="my-4">
            We can add some classes to modify the glowing intensity from 0 to 1
            <pre class="inline">{ glowingIntensity: number }</pre>
        </div>
        <div class="d-flex gap-8 mn-4">
            <Alert v-for="i in 10 " color="primary" glowing :glowingIntensity="i / 10">
                {{ i / 10 }}
                Hey ! I am an alert to show you something special, you should take a look
            </Alert>
        </div>

    </DocumentationSection>
</template>

<script>
import colors from "@/ui/utils/colors";

export default {
    name: "DocumentationAlerts",
    data() {
        return {
            colors
        };
    }
};
</script>

<style lang="scss">    
</style>