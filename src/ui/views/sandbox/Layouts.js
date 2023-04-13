
import Checkbox from '@/ui/components/inputs/Checkbox.vue';


let layoutData1 = [
    {
        isBox: true,
        boxes: [
            Checkbox,
        ]
    },
    {
        isBox: true,
        boxes: [
            {
                isBox: true,
                boxes: [
                    Checkbox,
                ]
            },
            {
                isBox: true,
                boxes: [
                    Checkbox,
                ]
            }
        ]
    }
];


let layoutData2 = [
    {
        isBox: true,
        title: "Panel 1",
        flex: 1,
        boxes: [
            {
                isBox: true,
                title: "Layout",
                flex: 1,
                boxes: []
            },
            {
                title: "Menus",
                isBox: true,
                flex: 1,
                boxes: []
            },
            {
                title: "Application",
                isBox: true,
                flex: 1,
                boxes: []
            },
            {
                isBox: true,
                flex: 1,
                title: "Fichiers",
                boxes: [
                    {
                        isBox: true,
                        flex: 1,
                        collapsed: true,
                        boxes: [
                            {
                                isBox: true,
                                flex: .5,
                                boxes: [
                                    Checkbox,
                                ]
                            },
                            {
                                isBox: true,
                                flex: 1.5,
                                boxes: [
                                    Checkbox,
                                    Checkbox,
                                    Checkbox,
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                isBox: true,
                flex: 1,
                collapsed: true,
                boxes: [
                    {
                        isBox: true,
                        collapsed: true,
                        boxes: [
                            Checkbox,
                        ]
                    },
                    {
                        isBox: true,
                        boxes: [
                            Checkbox,
                        ]
                    },
                    Checkbox,
                ]
            },
            {
                isBox: true,
                boxes: [
                    Checkbox,
                ]
            },
        ]
    },
    {
        isBox: true,
        boxes: [
            {
                isBox: true,
                flex: 1,
                collapsed: true,
                boxes: [
                    {
                        isBox: true,
                        collapsed: true,
                        boxes: [
                            Checkbox,
                        ]
                    },
                    {
                        isBox: true,
                        boxes: [
                            Checkbox,
                        ]
                    },
                    Checkbox,
                ]
            },
            {
                isBox: true,
                boxes: [
                    {
                        isBox: true,
                        flex: 1,
                        collapsed: true,
                        boxes: [
                            {
                                isBox: true,
                                collapsed: true,
                                boxes: [
                                    Checkbox,
                                ]
                            },
                            {
                                isBox: true,
                                boxes: [
                                    Checkbox,
                                ]
                            },
                            Checkbox,
                        ]
                    },
                    {
                        isBox: true,
                        boxes: [
                            Checkbox,
                        ]
                    },
                    Checkbox,
                ]
            },
            Checkbox,
        ]
    },
    Checkbox,
];


export {
    layoutData1,
    layoutData2
};