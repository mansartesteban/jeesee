<template>
    <h1>TreeView</h1>
    <DocumentationSection title="">
        <div class="d-flex flex-row gap-4 justify-content-space-between">
            <div class="flex">
                <TreeView :items="items"></TreeView>
            </div>
            <div class="flex" v-highlight>
                <pre class="language-json">{{ items }}</pre>
            </div>
        </div>

    </DocumentationSection>
</template>

<script>
import "vue-code-highlight/themes/window.css";
import "vue-code-highlight/themes/prism.css";

import ArrayUtils from '@/engine/utils/Arrays';
import MathUtils from '@/engine/utils/MathUtils';


let shapes = ["Rectangle", "Square", "Tetrahedron", "Sphere", "Cylinder", "Capsule", "Character"];
let icons = ["triangle", "square", "circle", "diamond", "gem", "hexagon", "star"];

export default {
    name: "DocumentationTreeView",
    components: {
    },
    data() {
        return {
            items: [],
            level: 0
        };
    },
    methods: {
        createTreeItem() {
            this.level++;
            let ret = {
                label: ArrayUtils.pickRandom(shapes),
                icon: ArrayUtils.pickRandom(icons)
            };

            if (this.level < MathUtils.random(1, 4)) {
                ret.items = [];
                for (let i = 0; i < MathUtils.random(1, 10); i++) {
                    ret.items.push(this.createTreeItem());
                }
            }
            this.level--;

            return ret;
        }
    },
    mounted() {
        for (let i = 0; i < MathUtils.random(1, 10); i++) {
            this.items.push(this.createTreeItem());
        }
    }
};
</script>