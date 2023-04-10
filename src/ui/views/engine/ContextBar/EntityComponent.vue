<template>
    <Card class="d-flex flex-column m-2 ms-8">

        <template #card-header>

            <Switch
                v-model="modelValue.active"
                class="me-2"
                :glowing="modelValue.active"
                :glowing-intensity=".3"
            >{{ modelValue.constructor.name }}</Switch>

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

        </template>

        <template
            #card-body
            v-if="components.options && components.options.length > 0 || components.attrs.length > 0"
        >

            <div
                class="card p-2 ms-2"
                v-if="components.options.length > 0"
            >
                <component
                    v-for="prp in components.options"
                    class="ms-2"
                    :is="handledPropType[prp.type]"
                    :label="prp.name.ucfirst()"
                    v-model="modelValue.options[prp.name]"
                ></component>

            </div>

            <div
                class="card p-2"
                v-if="components.attrs.length > 0"
            >
                <component
                    v-for="prp in components.attrs"
                    class="ms-2"
                    :is="handledPropType[prp.type]"
                    :label="prp.name.ucfirst()"
                    v-model="modelValue[prp.name]"
                ></component>

            </div>

        </template>

    </Card>
</template>

<script>
import InputVector3 from "@/ui/components/inputs/InputVector3";
import Checkbox from "@/ui/components/inputs/Checkbox";
import InputNumber from "@/ui/components/inputs/InputNumber";
import InputText from "@/ui/components/inputs/InputText";

export default {
    name: "EntityComponent",
    components: {
        InputVector3,
        Checkbox,
        InputNumber,
        InputText,
    },
    props: {
        modelValue: Object,
        linkedEntity: Object,
    },
    data() {
        return {
            actions: [
                {
                    label: "Remove component",
                    icon: "node-minus",
                    test: "test",
                    callback: () => {
                        this.linkedEntity.removeComponent(this.modelValue);
                    }
                }
            ],
            handledPropType: {
                Vector3: "InputVector3",
                Boolean: "Checkbox",
                Number: "InputNumber",
                String: "InputText",
            }
        };
    },
    computed: {
        components() {

            let components = {
                options: [],
                attrs: []
            };

            if (this.modelValue.options) {
                Object.keys(Object.getOwnPropertyDescriptors(this.modelValue.options)).forEach(key => {
                    if (key !== "active") {
                        if (this.modelValue.options[key].constructor.name in this.handledPropType) {
                            components.options.push({
                                name: key,
                                type: this.modelValue.options[key].constructor.name
                            });
                        }
                    }
                });
            }

            Object.keys(Object.getOwnPropertyDescriptors(this.modelValue)).forEach(key => {
                if (key !== "active" && this.modelValue[key] !== undefined) {
                    if (this.modelValue[key].constructor.name in this.handledPropType) {
                        components.attrs.push({
                            name: key,
                            type: this.modelValue[key].constructor.name
                        });
                    }
                }
            });

            return components;
        }
    }
};
</script>