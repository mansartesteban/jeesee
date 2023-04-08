<template>
    <div class="context-bar d-flex flex-column">

        <div class="entities-tree">
            <TreeView :items="entities" @row-clicked="selectEntity">
                <template #item-end="{ item, key }">
                    <Chip v-if="key === selectedKey" color="success" glowing></Chip>
                </template>
            </TreeView>
        </div>
        <Divider class="my-2"></Divider>
        <div v-if="selectedEntity && matchedEntity" class="entity-details">
            Selected: {{ selectedEntity }}
            <br>
            <br>
            Matched : {{ matchedEntity?.constructor.name }}
            <br>
            <br>

            <br>
            X<input type="number" :value="pos?.x" class="mw-2"><br>
            Y<input type="number" :value="pos?.y" class="mw-2"><br>
            Z<input type="number" :value="pos?.z" class="mw-2">


        </div>
        <Divider></Divider>

        <div v-if="matchedEntity">
            <div v-for="component in matchedEntity.components" class="d-flex m-2">
                <Checkbox v-model="component.active" class="me-2"></Checkbox>
                {{ component.constructor.name }}
            </div>
        </div>

    </div>
</template>
<script>
import Vue, { ref } from "vue";
import SceneManager from '@/engine/game/SceneManager';
import MeshRenderComponent from '@/engine/game/scenes/Default/Components/MeshRenderComponent';
import TransformComponent from '@/engine/game/scenes/Default/Components/TransformComponent';
import UiComponent from '@/engine/game/scenes/Default/Components/UiComponent';

export default {
    data() {
        return {
            test: false,
            selectedEntity: null,
            selectedKey: null,
            matchedEntity: null,
            entities: [],
            uiComponent: null,
            pos: null
        };
    },
    methods: {
        bindUiComponent(entity) {
            this.pos = entity.transform.position.clone();
        },
        selectEntity(selectedEntity, key) {
            if (this.matchedEntity) {
                this.matchedEntity.removeComponent(this.uiComponent);
                this.matchedEntity.selected = false;
            }

            this.selectedEntity = selectedEntity;
            this.selectedKey = key;
            this.matchedEntity = SceneManager.entities.find(entity => entity.uuid === this.selectedEntity.id);

            this.matchedEntity.selected = true;
            this.uiComponent = new UiComponent(this.bindUiComponent);
            let callback = this.matchedEntity.addComponent(this.uiComponent);

        }
    },
    mounted() {
        SceneManager.observer.$on("ENTITY_ADDED", (entity) => {
            this.entities.push({
                id: entity.uuid,
                label: entity.constructor.name,
                icon: "square",
                selected: false
            });
        });
        SceneManager.observer.$on("ENTITY_DELETED", (entity) => {
            this.entities.splice(this.entities.findIndex(e => entity.uuid === e.id), 1);
        });
    }

};
</script>
<style lang="scss">

    .entities-tree, .entity-details {
        max-height: 33%;
        overflow-y: scroll;
    }

</style>