<template>
    <div class="context-bar d-flex flex flex-column">

        <div class="entities-tree d-flex flex-column">
            <div class="m-2">Entities : {{ entities.length }}</div>
            <TreeView
                :items="entities"
                @row-clicked="selectEntity"
            >
                <template #next-to-label="{ item, key }">
                    <Button icon="pencil-square"></Button>
                    <Chip
                        v-if="key === selectedKey"
                        color="success"
                        glowing
                        class="mw-2"
                    ></Chip>
                </template>
                <template #item-end="{ item, key }">
                    <Button
                        icon="eye"
                        @click="toggleVisibility"
                    ></Button>
                    <Button icon="lock"></Button>
                    <Button
                        icon="trash"
                        @click.stop="deleteEntity(item)"
                    ></Button>

                </template>
            </TreeView>

            <Divider class="my-2"></Divider>

        </div>

        <div
            v-if="selectedEntity && matchedEntity"
            class="entity-details d-flex p-2 flex-column gap-1"
        >

            <TransformComponent
                :position="position"
                :rotation="rotation"
                :scale="scale"
                @update:position="matchedEntity.transform.position = $event"
                @update:rotation="matchedEntity.transform.rotation = $event"
                @update:scale="matchedEntity.transform.scale = $event"
            ></TransformComponent>

        </div>
        <Divider class="my-2"></Divider>

        <div
            v-if="matchedEntity"
            class="entity-components d-flex flex-column align-center"
        >

            <Menu
                activatorLabel="Add component"
                activatorIcon="node-plus"
                :items="componentList"
            ></Menu>

            <EntityComponent
                v-for="(component, key) in filteredComponents"
                v-model="filteredComponents[key]"
                :linkedEntity="matchedEntity"
            ></EntityComponent>


        </div>

    </div>
</template>

<script>
import SceneManager from '@core/SceneManager';
import Collider from '@core/components/colliders/Collider';
import Gravity from '@core/components/Gravity';
import MeshRenderComponent from '@core/components/MeshRenderComponent';
import PhysicsComponent from '@core/components/PhysicsComponent';
import UiComponent from '@core/components/UiComponent';
import RotateAroundPhysics from '@/engine/game/scenes/Default/Components/RotateAroundPhysics';
import BallPhysics from '@/engine/game/scenes/Default/Entities/Ball/BallPhysics';
import CarPhysics from '@/engine/game/scenes/Default/Entities/Car/CarPhysics';

export default {
    data() {
        return {
            test: "toto",
            selectedEntity: null,
            selectedKey: null,
            matchedEntity: null,
            entities: [],
            uiComponent: null,
            position: null, // TODO: Find a workaround
            rotation: null, // TODO: Find a workaround
            scale: null, // TODO: Find a workaround
            componentList: [
                {
                    label: "PhysicsComponent",
                    callback: () => {
                        this.matchedEntity.addComponent(new PhysicsComponent());
                    }
                },
                {
                    label: "CarPhysics",
                    callback: () => {
                        this.matchedEntity.addComponent(new CarPhysics());
                    }
                },
                {
                    label: "Collider",
                    callback: () => {
                        this.matchedEntity.addComponent(new Collider());
                    }
                },
                {
                    label: "MeshRenderComponent",
                    callback: () => {
                        this.matchedEntity.addComponent(new MeshRenderComponent());
                    }
                },
                {
                    label: "Gravity",
                    callback: () => {
                        this.matchedEntity.addComponent(new Gravity());
                    }
                },
                {
                    label: "BallPhysics",
                    callback: () => {
                        this.matchedEntity.addComponent(new BallPhysics());
                    }
                },
                {
                    label: "RotateAroundPhysics",
                    callback: () => {
                        this.matchedEntity.addComponent(new RotateAroundPhysics());
                    }
                }
            ],
            // entityCtxMenu: [
            //     {
            //         label: "Lock",
            //         icon: "lock"
            //     },
            //     {
            //         label: ""
            //     }
            // ]
        };
    },
    methods: {
        bindUiComponent(entity) {
            this.position = entity.transform.position.clone();
            this.rotation = entity.transform.rotation.clone();
            this.scale = entity.transform.scale.clone();
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
            this.matchedEntity.addComponent(this.uiComponent);

        },
        toggleVisibility() {
            // TODO: Filter on MeshRenderComponent get object and apply visible = false
        },
        deleteEntity(entity) {
            SceneManager.delete(entity.id);
        }
    },
    computed: {
        filteredComponents() {
            return this.matchedEntity
                ? this.matchedEntity.components.filter(component => !(component instanceof UiComponent))
                : [];
        }
    },
    mounted() {
        SceneManager.entities.forEach(entity => {
            this.entities.push({
                id: entity.uuid,
                label: entity.constructor.name,
                icon: "square",
                selected: false
            });
        });
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
.entities-tree,
.entity-details
{
    max-height: 25%;
    overflow-y: auto;
}

.entity-components
{
    overflow-y: auto;
}
</style>@/engine/core/components/Colliders/Collider@/engine/core/components/colliders/Collider