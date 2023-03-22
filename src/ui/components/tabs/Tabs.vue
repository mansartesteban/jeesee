<template>
    <div :class="classes">
        <TabBar :vertical="vertical">
            <template v-for="(tab, i) in tabsHeader" :key="'tab-header' + i">
                <Tab @click="selectTab(i)" :active="selectedTab === i">
                    <slot name="tab-bar">
                        {{ tab }}
                    </slot>
                </Tab>
            </template>
        </TabBar>

        <Divider></Divider>

        <template v-for="(tab, i) in tabsContent" :key="'tab-content' + i">
            <TabViewContainer>
                <slot name="tab-view">
                    <component :is="{ ...tab }"></component>
                </slot>
            </TabViewContainer>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        tabs: Object
    },
    computed: {
        containerClasses() {
            return [

            ];
        },
        classes() {
            return [
                "tabs",
                "d-flex",
                "flex-nowrap",
                "gap-6",
                this.vertical ? "flex-row" : "flex-column"
            ];
        },
        tabsContent() {
            return this.tabs.filter((tab, index) => !!tab.content && index === this.selectedTab).map(tab => tab.content);
        },
        tabsHeader() {
            return this.tabs.filter(tab => !!tab.header).map(tab => tab.header);
        }
    },
    data() {
        return {
            selectedTab: 0
        };
    },
    methods: {
        selectTab(index) {
            this.selectedTab = index;
        }
    },
};
</script>
<style lang="scss">
    .tabs {
        max-height: 100%;
        max-width: 100%;
    }
</style>