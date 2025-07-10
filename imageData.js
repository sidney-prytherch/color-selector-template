let backgroundColorInCanvas = "#d6eaf2"
let yamlOptionName = 'creature_flavor'
let firstColorIndexInYamlOption = 1;
let characterName = "Donkey Kong"
let additionalInfoOrInstructions = "";

let defaultColors = [
  '#402000',
  '#983000',
  '#A85000',
  '#181000',
  '#800000',
  '#F80000',
  '#603000',
  '#D07000',
  '#884000',
  '#C06000',
  '#F88070',
  '#F8A090',
  '#F8C0B8',
  '#F8E0D8',
  '#F8F8F8'
]

let defaultPalettes = [
    {
        name: "default Palette",
        colors: defaultColors
    },
    {
        name: "random ugly Palette",
        colors: [
            '#A85000',
            '#F8C0B8',
            '#402000',
            '#F8F8F8',
            '#983000',
            '#F8E0D8',
            '#181000',
            '#800000',
            '#F80000',
            '#603000',
            '#D07000',
            '#884000',
            '#C06000',
            '#F88070',
            '#F8A090'
        ]
    },
]

// define more color groups if necessary - don't forget to add "colorGroupCIndices", "mainColorOfGroupC" and add them to "colorGroups" and "mainColorsPerGroup" - you can add any amount
let furColorGroupIndices = [0,1,2,3,6,7,8,9];
let skinColorGroupIndices = [10,11,12,13,14];
let tieColorGroupIndices = [4, 5];
//let colorGroupCIndices = [...]

let mainFurColorIndex = 2;
let mainSkinColorIndex = 13;
let mainTieColorIndex = 5;
//let mainColorOfGroupC = ...;

let colorGroups = [furColorGroupIndices, skinColorGroupIndices, tieColorGroupIndices]
let mainColorsPerGroup = [mainFurColorIndex, mainSkinColorIndex, mainTieColorIndex]
let colorGroupNames = ["Fur", "Skin", "Tie/Mouth"]


// IMPORTANT: image_dk_01 through image_dk_16 are defined in animationFrameData.js now

// animation frames - some frames are repeated for the animation:
let animation1 = [image_dk_01, image_dk_02, image_dk_03, image_dk_04, image_dk_05, image_dk_06, image_dk_07, image_dk_08, image_dk_09, image_dk_10, image_dk_11, image_dk_12, image_dk_13, image_dk_14, image_dk_15, image_dk_16];
let animation2 = [image_dk_01, image_dk_02, image_dk_02, image_dk_02, image_dk_04, image_dk_01, image_dk_04, image_dk_07];
let animations = [
    {
        animationName: "animation 1",
        animationImages: animation1
    },
    {
        animationName: "garbage test animation",
        animationImages: animation2
    }
];

// colors in the colors array are part of color group A, selected by index in colors array:
