<template>
    <div class="d-flex flex-column m-2 ms-8">

        <div class="d-flex flex-nowrap">
            <Checkbox
                v-model="modelValue.active"
                class="me-2"
            >{{ modelValue.constructor.name }}</Checkbox>

            <div class="flex"></div>
            <Menu :items="actions">
                <template #activator="props">
                    <Button
                        v-bind="props"
                        rounded
                        icon="three-dots-vertical"
                    >
                    </Button>
                </template>
            </Menu>

        </div>

        <div
            v-for="(prp, key) in components"
            class="ms-2"
        >
            <template v-if="prp.type === 'Boolean'">
                <Checkbox
                    :label="prp.name"
                    v-model="modelValue.options[prp.name]"
                ></Checkbox>
            </template>
            <template v-else-if="prp.type === 'Vector3'">
                <InputVector3
                    :label="prp.name"
                    v-model="modelValue.options[prp.name]"
                ></InputVector3>
            </template>
            <template v-if="prp.type === 'Number'">
                <InputNumber
                    :label="prp.name"
                    v-model="modelValue.options[prp.name]"
                ></InputNumber>
            </template>
            <template v-if="prp.type === 'String'">
                <InputText
                    :label="prp.name"
                    v-model="modelValue.options[prp.name]"
                ></InputText>
            </template>

        </div>
    </div>
</template>

<script>
import UiComponent from '@/engine/game/scenes/Default/Components/UiComponent';

export default {
    name: "EntityComponent",
    props: {
        modelValue: Object,
        linkedEntity: Object,
    },
    data() {
        return {
            objectProps: [],
            actions: [
                {
                    label: "Remove component",
                    icon: "node-minus",
                    test: "test",
                    callback: () => {
                        this.linkedEntity.removeComponent(this.modelValue);
                    }
                }
            ]
        };
    },
    computed: {
        components() {
            let components = [];

            Object.keys(Object.getOwnPropertyDescriptors(this.modelValue.options)).forEach(key => {
                if (key !== "active") {
                    components.push({
                        name: key,
                        type: this.modelValue.options[key].constructor.name
                    });
                }
            });
            return components;
        }
    }
};
</script>