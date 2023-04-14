import Checkbox from "@/ui/components/inputs/Checkbox.vue";

let layoutData1 = [
  {
    isBox: true,
    boxes: [Checkbox],
  },
  {
    isBox: true,
    boxes: [
      {
        isBox: true,
        boxes: [Checkbox],
      },
      {
        isBox: true,
        boxes: [Checkbox],
      },
    ],
  },
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
        boxes: [],
      },
      {
        title: "Menus",
        isBox: true,
        flex: 1,
        boxes: [],
      },
      {
        title: "Application",
        isBox: true,
        flex: 1,
        boxes: [],
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
                flex: 0.5,
                boxes: [Checkbox],
              },
              {
                isBox: true,
                flex: 1.5,
                boxes: [Checkbox, Checkbox, Checkbox],
              },
            ],
          },
        ],
      },
      {
        isBox: true,
        flex: 1,
        collapsed: true,
        boxes: [
          {
            isBox: true,
            collapsed: true,
            boxes: [Checkbox],
          },
          {
            isBox: true,
            boxes: [Checkbox],
          },
          Checkbox,
        ],
      },
      {
        isBox: true,
        boxes: [Checkbox],
      },
    ],
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
            boxes: [Checkbox],
          },
          {
            isBox: true,
            boxes: [Checkbox],
          },
          Checkbox,
        ],
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
                boxes: [Checkbox],
              },
              {
                isBox: true,
                boxes: [Checkbox],
              },
              Checkbox,
            ],
          },
          {
            isBox: true,
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
  // {
  //   title: "Menus",
  //   isBox: true,
  //   flex: 1,
  //   id: "zero-one",
  // },
  {
    isBox: true,
    title: "Panel 1",
    flex: 1,
    id: "0",
  },
  {
    isBox: true,
    title: "Layout",
    flex: 1,
    id: "0-1",
  },
  // {
  //   title: "Application",
  //   isBox: true,
  //   flex: 1,
  //   id: "0-2",
  // },
  // {
  //   isBox: true,
  //   flex: 1,
  //   collapsed: true,
  //   id: "1-0",
  // },
  // {
  //   isBox: true,
  //   flex: 1,
  //   collapsed: true,
  //   id: "1-1-0",
  // },
  // {
  //   isBox: true,
  //   id: "1-1-1",
  // },
  // {
  //   isBox: true,
  //   id: "1-1",
  // },
  // {
  //   isBox: true,
  //   id: "1",
  // },
];
// let layoutData3 = [
//   {
//     isBox: true,
//     title: "Layout",
//     flex: 1,
//     id: "0-0",
//   },
//   {
//     title: "Menus",
//     isBox: true,
//     flex: 1,
//     id: "0-1",
//   },
//   {
//     title: "Application",
//     isBox: true,
//     flex: 1,
//     id: "0-2",
//   },
//   {
//     isBox: true,
//     flex: 0.5,
//     id: "0-3-0-0",
//   },
//   {
//     isBox: true,
//     flex: 1.5,
//     id: "0-3-0-1",
//   },
//   {
//     isBox: true,
//     flex: 1,
//     collapsed: true,
//     id: "0-3-0",
//   },
//   {
//     isBox: true,
//     flex: 1,
//     title: "Fichiers",
//     id: "0-3",
//   },
//   {
//     isBox: true,
//     collapsed: true,
//     id: "0-4-0",
//   },
//   {
//     isBox: true,
//     id: "0-4-1",
//   },
//   {
//     isBox: true,
//     flex: 1,
//     collapsed: true,
//     id: "0-4",
//   },
//   {
//     isBox: true,
//     id: "0-5",
//   },
//   {
//     isBox: true,
//     title: "Panel 1",
//     flex: 1,
//     id: "0",
//   },
//   {
//     isBox: true,
//     collapsed: true,
//     id: "1-0-0",
//   },
//   {
//     isBox: true,
//     id: "1-0-1",
//   },
//   {
//     isBox: true,
//     flex: 1,
//     collapsed: true,
//     id: "1-0",
//   },
//   {
//     isBox: true,
//     collapsed: true,
//     id: "1-1-0-0",
//   },
//   {
//     isBox: true,
//     id: "1-1-0-1",
//   },
//   {
//     isBox: true,
//     flex: 1,
//     collapsed: true,
//     id: "1-1-0",
//   },
//   {
//     isBox: true,
//     id: "1-1-1",
//   },
//   {
//     isBox: true,
//     id: "1-1",
//   },
//   {
//     isBox: true,
//     id: "1",
//   },
// ];

export { layoutData1, layoutData2, layoutData3 };
