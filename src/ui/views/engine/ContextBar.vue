<template>
    <div class="context-bar d-flex flex-column">

        <div class="entities-tree">
            <div>Entities : {{ entities.length }}</div>
            <TreeView
                :items="entities"
                @row-clicked="selectEntity"
            >
                <template #item-end="{ item, key }">
                    <Chip
                        v-if="key === selectedKey"
                        color="success"
                        glowing
                    ></Chip>
                </template>
            </TreeView>
        </div>
        <Divider></Divider>
        <div
            v-if="selectedEntity && matchedEntity"
            class="entity-details p-2 d-flex flex-column gap-1"
        >

            <InputVector3
                label="Position"
                :modelValue="position"
                @update:modelValue="matchedEntity.transform.position = $event"
            ></InputVector3>

            <InputVector3
                label="Rotation"
                :modelValue="rotation"
                @update:modelValue="matchedEntity.transform.rotation = $event"
            ></InputVector3>

            <InputVector3
                label="Scale"
                :modelValue="scale"
                @update:modelValue="matchedEntity.transform.scale = $event"
            ></InputVector3>

        </div>
        <Divider></Divider>

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
import SceneManager from '@/engine/game/SceneManager';
import Collider from '@/engine/game/scenes/Default/Components/Colliders/Collider';
import Gravity from '@/engine/game/scenes/Default/Components/Gravity';
import MeshRenderComponent from '@/engine/game/scenes/Default/Components/MeshRenderComponent';
import PhysicsComponent from '@/engine/game/scenes/Default/Components/PhysicsComponent';
import UiComponent from '@/engine/game/scenes/Default/Components/UiComponent';
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
            ]
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
        max-height: 25%;
        overflow-y: auto;
    }
    
    .entity-components {
        overflow-y: auto;
    }

</style>