<template>
    <h1>Progress bars</h1>
    <DocumentationSection title="Progress bars colors">
        <div>
            We can add some classes to modify the color of buttons
            <template v-for="color in colors">
                <pre class="inline">.{{ color }}</pre>,
            </template>
        </div>
        <div class="d-flex flex-column gap-4 mn-4">
            <ProgressBar v-for="(color, i) in colors" :color="color" :progression="20 + i * 10"></ProgressBar>
        </div>
        <div class="mn-4">
            <ProgressBar :progression="prog" color="primary"></ProgressBar>
        </div>
        <div class="mn-4">
            <ProgressBar :progression="prog" color="primary" indeterminated></ProgressBar>
        </div>
    </DocumentationSection>
</template>

<script>
import colors from '@/ui/utils/colors';
export default {
    name: "DocumentationProgressBars",
    data() {
        return {
            colors,
            prog: 0
        };
    },
    created() {
        setInterval(() => {
            console.log; ("interval ?");
            this.prog += Math.random() > .75 ? .1 : 0;
            if (this.prog > 100) {
                this.prog = 0;
            }
        }, 5);
    }
};
</script>

<style lang="scss">    
</style>