


window.addEventListener("load", loadValues);

function loadValues() {

    let maxPixelSize = 20;

    let canvas = document.getElementById("creatureCanvas")
    let ctx = canvas.getContext("2d");
    let textarea = document.getElementById("textarea")
    let hueSlider = document.getElementById("hueSlider")
    let colorGroupASlider = document.getElementById("colorGroupASlider")
    let colorGroupBSlider = document.getElementById("colorGroupBSlider")
    let saturationSlider = document.getElementById("saturationSlider")
    let saturationColorGroupASlider = document.getElementById("saturationcolorGroupASlider")
    let saturationColorGroupBSlider = document.getElementById("saturationcolorGroupBSlider")
    let brightnessSlider = document.getElementById("brightnessSlider")
    let brightnessColorGroupASlider = document.getElementById("brightnesscolorGroupASlider")
    let brightnessColorGroupBSlider = document.getElementById("brightnesscolorGroupBSlider")
    let pixelSizeSlider = document.getElementById("pixelSizeSlider")
    let table = document.getElementById("table");
    let randomizeCreatureColorsButton = document.getElementById("randomizeCreatureColors");
    let uniformColorGroupBHuesButton = document.getElementById("uniformColorGroupBHues");
    let uniformColorGroupAHuesButton = document.getElementById("uniformColorGroupAHues");
    let chaosCreatureButton = document.getElementById("chaosCreatureButton");
    let randomizeCreatureEverythingButton = document.getElementById("randomizeCreatureEverything");
    let resetColorGroupAColorsButton = document.getElementById("resetColorGroupAColors");
    let resetColorGroupBColorsButton = document.getElementById("resetColorGroupBColors");
    let resetCreatureColorsButton = document.getElementById("resetCreatureColors");
    let saveGifButton = document.getElementById("saveGif");

    let randomizeColorGroupAColorsButton = document.getElementById("randomizeColorGroupAColors");
    let randomizeColorGroupBColorsButton = document.getElementById("randomizeColorGroupBColors");
    let randomizeCreatureColorsTableButton = document.getElementById("randomizeCreatureColorsTable");
    let randomizeColorGroupAHuesButton = document.getElementById("randomizeColorGroupAHues");
    let randomizeColorGroupBHuesButton = document.getElementById("randomizeColorGroupBHues");
    let randomizeHuesButton = document.getElementById("randomizeHues");

    let resetSliders = () => {
        hueSlider.value = 0;
        colorGroupBSlider.value = 0;
        colorGroupASlider.value = 0;
        saturationSlider.value = 0;
        saturationColorGroupBSlider.value = 0;
        saturationColorGroupASlider.value = 0;
        brightnessSlider.value = 0;
        brightnessColorGroupBSlider.value = 0;
        brightnessColorGroupASlider.value = 0;
    }

    // the colors are organized into groupA and groupB - for creature, groupA = body and groupB = outline and feet
    // for the randomization, these values specify the acceptible range for the saturation and brightness for these color groups.
    // You'll likely have to play around with these ranges.
    let colorModifiers = {
        // when selecting a random color, the saturation value of the main colors should be between -.6 and .6
        saturationGroupAStart: -.6,
        saturationGroupAEnd: .6,
        // when selecting a random color, the brightness value of the main colors should be between -.4 and .1
        brightnessGroupAStart: -.4,
        brightnessGroupAEnd: .1,
        
        // when selecting a random color, the saturation value of the groupB colors should be between -.5 and .7
        saturationGroupBStart: -.5,
        saturationGroupBEnd: .7,
        // when selecting a random color, the brightness value of the groupB colors should be between -.5 and .1
        brightnessGroupBStart: -.5,
        brightnessGroupBEnd: .1,
    }

    colorModifiers['saturationGroupARange'] = colorModifiers.saturationGroupAEnd - colorModifiers.saturationGroupAStart
    colorModifiers['brightnessGroupARange'] = colorModifiers.brightnessGroupAEnd - colorModifiers.brightnessGroupAStart
    colorModifiers['saturationGroupBRange'] = colorModifiers.saturationGroupBEnd - colorModifiers.saturationGroupBStart
    colorModifiers['brightnessGroupBRange'] = colorModifiers.brightnessGroupBEnd - colorModifiers.brightnessGroupBStart


    let creatureColors = [];
    let defaultCreatureColors = [];
    let currentCreatureColors = [];

    colors.forEach(value => {
        if (!!value) {
            creatureColors.push({ color: value });
            defaultCreatureColors.push(value)
            currentCreatureColors.push(value)
        }
    });

    for (let i = 0; i < creatureImages.length; i++) {
        let table = creatureImages[i];
        for (let y = 0; y < table.length; y++) {
            for (let x = 0; x < table[y].length; x++) {
                for (let color of creatureColors) {
                    if (table[y][x] === color.color) {
                        table[y][x] = color;
                    }
                }
            }
        }
    }


    let creatureTableRows = [];
    for (let i = 0; i < creatureColors.length; i++) {

        let color = creatureColors[i]
        let row = table.insertRow(i);
        let cell = row.insertCell(0);
        let cell2 = row.insertCell(1);

        var span = document.createElement("span");
        span.innerHTML = `${i + 1}: ${creatureColors[i].color}`;

        cell2.appendChild(span)

        var input = document.createElement("input");
        input.type = "color";
        cell.appendChild(input); // put it into the DOM
        input.value = color.color

        creatureTableRows.push(
            {
                color: color,
                input: input,
                span: span
            }
        );
    }

    let creature = new Creature(creatureImages, creatureColors, defaultCreatureColors, canvas, ctx, colorGroupAIndices, creatureTableRows, 'creature_flavor', "#d6eaf2", textarea, resetSliders, colorModifiers);

    for (let i = 0; i < creatureTableRows.length; i++) {
        creatureTableRows[i].input.addEventListener("input", () => { creature.draw() });
        creatureTableRows[i].input.addEventListener("change", () => { creature.saveCurrentColors() })
    }

    canvas.addEventListener("click", () => { creature.changeAnimation(/*saveGifHelper*/) }, false);

    hueSlider.addEventListener("input", () => { creature.setAllColorsRelativeHue(Number.parseInt(hueSlider.value)) })
    colorGroupASlider.addEventListener("input", () => { creature.setColorGroupARelativeHues(Number.parseInt(colorGroupASlider.value)) })
    colorGroupBSlider.addEventListener("input", () => { creature.setColorGroupBRelativeHue(Number.parseInt(colorGroupBSlider.value)) })

    saturationSlider.addEventListener("input", () => { creature.changeAllSaturation(Number.parseFloat(saturationSlider.value)) })
    saturationColorGroupBSlider.addEventListener("input", () => { creature.setColorGroupBRelativeSaturation(Number.parseFloat(saturationColorGroupBSlider.value)) })
    saturationColorGroupASlider.addEventListener("input", () => { creature.setColorGroupARelativeSaturation(Number.parseFloat(saturationColorGroupASlider.value)) })

    brightnessSlider.addEventListener("input", () => { creature.changeAllBrightness(Number.parseFloat(brightnessSlider.value)) })
    brightnessColorGroupBSlider.addEventListener("input", () => { creature.setColorGroupBRelativeBrightness(Number.parseFloat(brightnessColorGroupBSlider.value)) })
    brightnessColorGroupASlider.addEventListener("input", () => { creature.setColorGroupARelativeBrightness(Number.parseFloat(brightnessColorGroupASlider.value)) })

    pixelSizeSlider.addEventListener("input", () => { creature.setPixelSize(pixelSizeSlider.value) })

    hueSlider.addEventListener("change", () => { creature.saveCurrentColors() })
    colorGroupBSlider.addEventListener("change", () => { creature.saveCurrentColors() })
    colorGroupASlider.addEventListener("change", () => { creature.saveCurrentColors() })
    saturationSlider.addEventListener("change", () => { creature.saveCurrentColors() })
    saturationColorGroupBSlider.addEventListener("change", () => { creature.saveCurrentColors() })
    saturationColorGroupASlider.addEventListener("change", () => { creature.saveCurrentColors() })
    brightnessSlider.addEventListener("change", () => { creature.saveCurrentColors() })
    brightnessColorGroupBSlider.addEventListener("change", () => { creature.saveCurrentColors() })
    brightnessColorGroupASlider.addEventListener("change", () => { creature.saveCurrentColors() })

    randomizeCreatureColorsButton.addEventListener("click", () => { creature.randomizeColors() });
    uniformColorGroupBHuesButton.addEventListener("click", () => { creature.uniformColorGroupBHues() });
    uniformColorGroupAHuesButton.addEventListener("click", () => { creature.uniformColorGroupAHues() });
    chaosCreatureButton.addEventListener("click", () => { creature.chaosButton() });
    randomizeCreatureEverythingButton.addEventListener("click", () => { creature.randomizeAllColorQualities() });
    resetColorGroupAColorsButton.addEventListener("click", () => { creature.resetColorGroupAToDefault() });
    resetColorGroupBColorsButton.addEventListener("click", () => { creature.resetColorGroupBToDefault() });
    resetCreatureColorsButton.addEventListener("click", () => { creature.resetAllColorsToDefault() });

    saveGifButton.addEventListener("click", () => { creature.saveGif(maxPixelSize) })

    randomizeColorGroupAColorsButton.addEventListener("click", () => {creature.randomizeGroupAColorQualities()});
    randomizeColorGroupBColorsButton.addEventListener("click", () => {creature.randomizeGroupBColorQualities()});
    randomizeCreatureColorsTableButton.addEventListener("click", () => {creature.randomizeAllColorQualities()});
    randomizeColorGroupAHuesButton.addEventListener("click", () => {creature.randomizeGroupAHues()});
    randomizeColorGroupBHuesButton.addEventListener("click", () => {creature.randomizeGroupBHues()});
    randomizeHuesButton.addEventListener("click", () => {creature.randomizeColors()});

    

    resetSliders();

    creature.changeAnimation();
}
