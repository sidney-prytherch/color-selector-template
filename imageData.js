let backgroundColorInCanvas = "#d6eaf2"
let yamlOptionName = 'Donkey'
let firstColorIndexInYamlOption = 1;
let characterName = "Donkey Kong"
let additionalInfoOrInstructions = "";

let defaultColors = [
    "#181000",
    "#402000",
    "#603000",
    "#884000",
    "#A85000",
    "#C06000",
    "#D07000",
    "#F80000",
    "#800000",
    "#983000",
    "#F88070",
    "#F8A090",
    "#F8C0B8",
    "#F8E0D8",
    "#F8F8F8",
]

let defaultPalettes = [
    {
        name: "DKC Default",
        colors: defaultColors
    },
    {
        name: "DKC Default (Inactive)",
        colors: [
            '#181808',
            '#392008',
            '#522908',
            '#6A3908',
            '#8B4108',
            '#9C5208',
            '#AC6208',
            '#CD0808',
            '#6A0808',
            '#7B2908',
            '#C56A5A',
            '#C5837B',
            '#C59C94',
            '#C5B4AC',
            '#CDCDCD',
        ]
    },
    {
        name: "DKC Team 2",
        colors: [
            '#181000',
            '#412000',
            '#623100',
            '#8B4100',
            '#AC5200',
            '#C56200',
            '#D57300',
            '#FFE600',
            '#AC7300',
            '#9C3100',
            '#FF8373',
            '#FFA494',
            '#FFC5BD',
            '#FFE6DE',
            '#FFFFFF',
        ]
    },
    {
        name: "DKC Team 2 (Inactive)",
        colors: [
            '#181808',
            '#392008',
            '#522908',
            '#6A3908',
            '#8B4108',
            '#9C5208',
            '#AC6208',
            '#CDB408',
            '#8B5A08',
            '#7B2908',
            '#C56A5A',
            '#C5837B',
            '#C59C94',
            '#C5B4AC',
            '#CDCDCD',
        ]
    },
    {
        name: "DKC2 Diddy Team 2",
        colors: [
            '#181000',
            '#412000',
            '#623100',
            '#8B4100',
            '#AC5200',
            '#C56200',
            '#D57300',
            '#CD62EE',
            '#7B31D5',
            '#9C3100',
            '#FF8373',
            '#FFA494',
            '#FFC5BD',
            '#FFE6DE',
            '#FFFFFF',
        ]
    },
    {
        name: "DKC3 Kiddy",
        colors: [
            '#181000',
            '#412000',
            '#623100',
            '#8B4100',
            '#AC5200',
            '#C56200',
            '#D57300',
            '#52BDF6',
            '#5A6AAC',
            '#9C3100',
            '#FF8373',
            '#FFA494',
            '#FFC5BD',
            '#FFE6DE',
            '#FFFFFF',
        ]
    },
    {
        name: "DKC3 Kiddy Team 2",
        colors: [
            '#181000',
            '#412000',
            '#623100',
            '#8B4100',
            '#AC5200',
            '#C56200',
            '#D57300',
            '#6AFFAC',
            '#208B4A',
            '#9C3100',
            '#FF8373',
            '#FFA494',
            '#FFC5BD',
            '#FFE6DE',
            '#FFFFFF',
        ]
    },
    {
        name: "Black Tie",
        colors: [
            '#181000',
            '#412000',
            '#623100',
            '#8B4100',
            '#AC5200',
            '#C56200',
            '#D57300',
            '#525252',
            '#202020',
            '#9C3100',
            '#FF8373',
            '#FFA494',
            '#FFC5BD',
            '#FFE6DE',
            '#FFFFFF',
        ]
    },
    {
        name: "White Tie",
        colors: [
            '#181000',
            '#412000',
            '#623100',
            '#8B4100',
            '#AC5200',
            '#C56200',
            '#D57300',
            '#FFFFFF',
            '#C5C5C5',
            '#9C3100',
            '#FF8373',
            '#FFA494',
            '#FFC5BD',
            '#FFE6DE',
            '#FFFFFF',
        ]
    },
    {
        name: "Purple Tie",
        colors: [
            '#181000',
            '#412000',
            '#623100',
            '#8B4100',
            '#AC5200',
            '#C56200',
            '#D57300',
            '#CD62EE',
            '#7B31D5',
            '#9C3100',
            '#FF8373',
            '#FFA494',
            '#FFC5BD',
            '#FFE6DE',
            '#FFFFFF',
        ]
    },
    {
        name: "DKC2 Frozen",
        colors: [
            '#184AB4',
            '#3973CD',
            '#629CEE',
            '#6AACF6',
            '#7BBDFF',
            '#8BD5FF',
            '#9CDEFF',
            '#DEF6FF',
            '#3973CD',
            '#6AC5FF',
            '#9CDEFF',
            '#B4E6FF',
            '#C5EEFF',
            '#DEF6FF',
            '#FFFFFF',
        ]
    },
    {
        name: "DKC2 Reversed",
        colors: [
            '#180020',
            '#41006A',
            '#6A00B4',
            '#9C00FF',
            '#B429FF',
            '#CD52FF',
            '#E67BFF',
            '#EEACFF',
            '#6A00B4',
            '#B429FF',
            '#C552FF',
            '#D573FF',
            '#E69CFF',
            '#F6BDFF',
            '#FFFFFF',
        ]
    },
    {
        name: "DKC2 Slow",
        colors: [
            '#200808',
            '#6A0800',
            '#B40000',
            '#F60000',
            '#FF1800',
            '#FF4A00',
            '#FF6A00',
            '#FF1800',
            '#6A0800',
            '#F60000',
            '#F62910',
            '#FF5229',
            '#FF7339',
            '#FF9C4A',
            '#FFFFFF',
        ]
    },
    {
        name: "Golden",
        colors: [
            '#9C6A08',
            '#A47B10',
            '#B48B18',
            '#BD9C20',
            '#C5AC29',
            '#D5BD31',
            '#DECD39',
            '#FFFF52',
            '#C59408',
            '#C59408',
            '#DECD39',
            '#E6DE41',
            '#F6EE4A',
            '#FFFF52',
            '#FFFFBD',
        ]
    },
    {
        name: "Monochrome",
        colors: [
            '#393939',
            '#4A4A4A',
            '#525252',
            '#626262',
            '#737373',
            '#7B7B7B',
            '#8B8B8B',
            '#D5D5D5',
            '#414141',
            '#626262',
            '#8B8B8B',
            '#A4A4A4',
            '#BDBDBD',
            '#D5D5D5',
            '#EEEEEE',
        ]
    },
    {
        name: "GB Green",
        colors: [
            '#103910',
            '#103910',
            '#103910',
            '#103910',
            '#316231',
            '#316231',
            '#316231',
            '#8BB410',
            '#103910',
            '#316231',
            '#316231',
            '#8BB410',
            '#8BB410',
            '#8BB410',
            '#8BB410',
        ]
    },
    {
        name: "GB Gray",
        colors: [
            '#000000',
            '#000000',
            '#000000',
            '#000000',
            '#626262',
            '#626262',
            '#626262',
            '#ACACAC',
            '#000000',
            '#626262',
            '#626262',
            '#ACACAC',
            '#ACACAC',
            '#ACACAC',
            '#ACACAC',
        ]
    },
    {
        name: "GBC Retro Blast",
        colors: [
            '#6A1800',
            '#6A1800',
            '#6A1800',
            '#6A1800',
            '#E67300',
            '#E67300',
            '#E67300',
            '#FFBD73',
            '#6A1800',
            '#E67300',
            '#E67300',
            '#FFBD73',
            '#FFBD73',
            '#FFBD73',
            '#FFBD73',
        ]
    },
]

// define more color groups if necessary - don't forget to add "colorGroupCIndices", "mainColorOfGroupC" and add them to "colorGroups" and "mainColorsPerGroup" - you can add any amount
let furColorGroupIndices = [0,1,2,3,4,5,6,9];
let skinColorGroupIndices = [10,11,12,13,14];
let tieColorGroupIndices = [7, 8];
//let colorGroupCIndices = [...]

let mainFurColorIndex = 2;
let mainSkinColorIndex = 11;
let mainTieColorIndex = 7;
//let mainColorOfGroupC = ...;

let colorGroups = [furColorGroupIndices, skinColorGroupIndices, tieColorGroupIndices]
let mainColorsPerGroup = [mainFurColorIndex, mainSkinColorIndex, mainTieColorIndex]
let colorGroupNames = ["Fur", "Skin", "Tie/Mouth"]

// animation frames - some frames are repeated for the animation:
let animationWalk = [imageDKWalk_01, imageDKWalk_02, imageDKWalk_03, imageDKWalk_04, imageDKWalk_05, imageDKWalk_06, imageDKWalk_07, imageDKWalk_08, imageDKWalk_09, imageDKWalk_10, imageDKWalk_11, imageDKWalk_12, imageDKWalk_13, imageDKWalk_14, imageDKWalk_15, imageDKWalk_16, imageDKWalk_17, imageDKWalk_18, imageDKWalk_19, imageDKWalk_20];
let animationRolling = [imageDKRoll_01, imageDKRoll_02, imageDKRoll_03, imageDKRoll_04, imageDKRoll_05, imageDKRoll_06, imageDKRoll_07, imageDKRoll_08, imageDKRoll_09, imageDKRoll_10, imageDKRoll_11, imageDKRoll_12, imageDKRoll_13, imageDKRoll_14, imageDKRoll_15, imageDKRoll_16];
let animations = [
    {
        animationName: "Walking",
        animationImages: animationWalk,
        animationSeconds: .2
    },
    {
        animationName: "Rolling",
        animationImages: animationRolling,
        animationSeconds: 1.1
    }
];
