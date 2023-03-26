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
import MyNoise from '@/engine/utils/MyNoise';

export default {
    name: "DocumentationProgressBars",
    data() {
        return {
            colors,
            prog: 0
        };
    },
    created() {
        let i = 0;
        MyNoise.regenerate(10000);
        setInterval(() => {
            let n = MyNoise.noise(i / 100);
            this.prog += n / 10;
            i++;
            if (this.prog > 100) {
                this.prog = 0;
                i = 0;
            }
        }, 5);
    }
};
</script>

<style lang="scss">    
</style>