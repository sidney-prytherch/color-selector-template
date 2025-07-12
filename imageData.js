let characters = [
    {
        characterName: "Kirby",
        yamlOptionName: 'kirby_flavor',
        firstColorIndexInYamlOption: 1,
        additionalInfoOrInstructions: "Make sure you also set kirby_flavor_preset to custom",
        buttonColor: "#FDCACE",
        buttonOutline: "#661E2A",
        buttonFontColor: "#111111",
        backgroundColorInCanvas: "#D6EAF2",
        backgroundColor: "#D6EAF2",
        palettes: [
            {
                name: "Kirby Default",
                colors: [
                    "#B01810",
                    "#F0E0E8",
                    "#C8A0A8",
                    "#A87070",
                    "#E02018",
                    "#F0A0B8",
                    "#D07880",
                    "#A85048",
                    "#E8D0D0",
                    "#E85048",
                    "#D0C0C0",
                    "#B08888",
                    "#E87880",
                    "#F8F8F8",
                    "#B03830",
                ]
            }
        ],
        currentDefaultPaletteIndex: 0,
        colorGroupData: [
            {
                colorGroupName: "Body",
                colorIndices: [13, 10, 8, 5, 1],
                indexOfMainColor: 13
            },
            {
                colorGroupName: "Feet/Outline",
                colorIndices: [14, 12, 11, 9, 7, 6, 4, 3, 2, 0],
                indexOfMainColor: 0
            }
        ],
        animations: [
            {
                animationName: "Walking",
                animationImages: [kirby_walk_03, kirby_walk_04, kirby_walk_05, kirby_walk_04, kirby_walk_03, kirby_walk_02, kirby_walk_01, kirby_walk_02],
                animationSeconds: 1
            }
        ],
        currentAnimationIndex: 0
    },
    {
        characterName: "Gooey",
        yamlOptionName: 'gooey_flavor',
        firstColorIndexInYamlOption: 1,
        additionalInfoOrInstructions: "Make sure you also set gooey_flavor_preset to custom",
        buttonColor: "#13248E",
        buttonOutline: "#132438",
        buttonFontColor: "#EEEEEE",
        backgroundColorInCanvas: "#D6EAF2",
        backgroundColor: "#D6EAF2",
        palettes: [
            {
                name: "Gooey Default",
                colors: [
                    "#000909", //pupil, outer-most ring
                    "#0E1E2A", //ring-highlight
                    "#132438", //beard
                    "#132865", //face
                    "#13248E", //forehead
                    "#9E030F", //mouth
                    "#DF3838", //tongue
                    "#C5B2B3", //eye-lid
                    "#F6F6F6", //eye
       
                ]
            },
            {
                name: "Gooey Red",
                colors: [
                    '#090007',
                    '#2a0e19',
                    '#38131d',
                    '#65131a',
                    '#8e1612',
                    '#9e030f',
                    '#df3838',
                    '#c5b2b3',
                    '#f6f6f6'
                ]
            }
        ],
        currentDefaultPaletteIndex: 0,
        colorGroupData: [
            {
                colorGroupName: "Body",
                colorIndices: [0, 1, 2, 3, 4],
                indexOfMainColor: 4
            },
            {
                colorGroupName: "Mouth",
                colorIndices: [5, 6],
                indexOfMainColor: 5
            },
            {
                colorGroupName: "Eyes",
                colorIndices: [7, 8],
                indexOfMainColor: 8
            }
        ],
        animations: [
            {
                animationName: "Grab",
                animationImages: 
                    [gooey0,
                    gooey1,
                    gooey2,
                    gooey3,
                    gooey4,
                    gooey5,
                    gooey6,
                    gooey7,
                    gooey8,
                    gooey9,
                    gooey10,
                    gooey11,
                    gooey0, gooey1, gooey2, gooey3, gooey4, gooey2, gooey1],
                animationSeconds: 2
            }
        ],
        currentAnimationIndex: 0
    }
];