import Checkbox from "@/ui/components/inputs/Checkbox.vue";

let layoutData1 = [
  {
    type: "box",
    boxes: [Checkbox],
  },
  {
    type: "box",
    boxes: [
      {
        type: "box",
        boxes: [Checkbox],
      },
      {
        type: "box",
        boxes: [Checkbox],
      },
    ],
  },
];

let layoutData2 = [
  {
    type: "box",
    title: "Panel 1",
    flex: 1,
    boxes: [
      {
        type: "box",
        title: "Layout",
        flex: 1,
        boxes: [],
      },
      {
        title: "Menus",
        type: "box",
        flex: 1,
        boxes: [],
      },
      {
        title: "Application",
        type: "box",
        flex: 1,
        boxes: [],
      },
      {
        type: "box",
        flex: 1,
        title: "Fichiers",
        boxes: [
          {
            type: "box",
            flex: 1,
            collapsed: true,
            boxes: [
              {
                type: "box",
                flex: 0.5,
                boxes: [Checkbox],
              },
              {
                type: "box",
                flex: 1.5,
                boxes: [Checkbox, Checkbox, Checkbox],
              },
            ],
          },
        ],
      },
      {
        type: "box",
        flex: 1,
        collapsed: true,
        boxes: [
          {
            type: "box",
            collapsed: true,
            boxes: [Checkbox],
          },
          {
            type: "box",
            boxes: [Checkbox],
          },
          Checkbox,
        ],
      },
      {
        type: "box",
        boxes: [Checkbox],
      },
    ],
  },
  {
    type: "box",
    boxes: [
      {
        type: "box",
        flex: 1,
        collapsed: true,
        boxes: [
          {
            type: "box",
            collapsed: true,
            boxes: [Checkbox],
          },
          {
            type: "box",
            boxes: [Checkbox],
          },
          Checkbox,
        ],
      },
      {
        type: "box",
        boxes: [
          {
            type: "box",
            flex: 1,
            collapsed: true,
            boxes: [
              {
                type: "box",
                collapsed: true,
                boxes: [Checkbox],
              },
              {
                type: "box",
                boxes: [Checkbox],
              },
              Checkbox,
            ],
          },
          {
            type: "box",
            boxes: [Checkbox],
          },
          Checkbox,
        ],
      },
      Checkbox,
    ],
  },
  Checkbox,
];
let layoutData3 = [
  {
    type: "box",
    title: "Layout",
    flex: 1,
    id: "0-0",
  },
  {
    title: "Menus",
    type: "box",
    flex: 1,
    id: "0-1",
  },
  {
    title: "Application",
    type: "box",
    flex: 1,
    id: "1-1-1-2",
  },
  {
    type: "box",
    flex: 0.5,
    id: "0-3-0-0",
  },
  {
    type: "box",
    flex: 1.5,
    id: "0-3-0-1",
  },
  {
    type: "box",
    flex: 1,
    collapsed: true,
    id: "0-3-0",
  },
  {
    type: "box",
    flex: 1,
    title: "Fichiers",
    id: "0-3",
  },
  {
    type: "box",
    collapsed: true,
    id: "0-4-0",
  },
  {
    type: "box",
    id: "0-4-1",
  },
  {
    type: "box",
    flex: 1,
    collapsed: true,
    id: "0-4",
  },
  {
    type: "box",
    id: "0-5",
  },
  {
    type: "box",
    title: "Panel 1",
    flex: 1,
    id: "0",
  },
  {
    type: "box",
    collapsed: true,
    id: "1-0-0",
  },
  {
    type: "box",
    id: "1-0-1",
  },
  {
    type: "box",
    flex: 1,
    collapsed: true,
    id: "1-0",
  },
  {
    type: "box",
    collapsed: true,
    id: "1-1-0-0",
  },
  {
    type: "box",
    id: "1-1-0-1",
  },
  {
    type: "box",
    flex: 1,
    collapsed: true,
    id: "1-1-0",
  },
  {
    type: "box",
    id: "1-1-1",
  },
  {
    type: "box",
    id: "1-1",
  },
  {
    type: "box",
    id: "1",
  },
];

let defaultLayout = [
  {
    type: "box",
    id: "0-1",
    flex: .1
  },
  {
    type: "box",
    id: "0-2",
    flex: 2,
    title: "SceneView",
    closable: false
  },
  {
    type: "box",
    id: "0-3",
    flex: .5,
    title: "Entities Manager"
  },
  {
    type: "box",
    id: "1-0",
    title: "Assets & Scripts"
  },
];

export { layoutData1, layoutData2, layoutData3, defaultLayout };
