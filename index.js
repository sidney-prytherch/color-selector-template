


window.addEventListener("load", loadValues);

function loadValues() {

    //this will get rewritten automatically now
    let maxPixelSize = 20;

    document.getElementById("span-instructions").innerHTML = `Click ${characterName} to pause/continue animation`
    document.getElementById("additional-info").innerHTML = `${additionalInfoOrInstructions}`

    let canvas = document.getElementById("creatureCanvas")
    let ctx = canvas.getContext("2d");
    let textarea = document.getElementById("textarea")
    let pixelSizeSlider = document.getElementById("pixelSizeSlider")
    let colorHexTable = document.getElementById("colorHexTable");
    let saveGifButton = document.getElementById("saveGif");
    let randomizeCreatureEverythingButton = document.getElementById("randomizeCreatureEverything")


    let maxPixelHeight = 0;
    let maxPixelWidth = 0;
    for (let image of creatureImages) {
        let pixelHeight = image.length;
        let pixelWidth = image.length > 0 ? image[0].length : 0;
        maxPixelHeight = Math.max(maxPixelHeight, pixelHeight);
        maxPixelWidth = Math.max(maxPixelWidth, pixelWidth);
    }

    let maxPixelSizeByHeight = Math.floor((canvas.height - 40) / maxPixelHeight);
    let maxPixelSizeByWidth = Math.floor((canvas.width - 40) / maxPixelWidth);
    maxPixelSize = Math.min(maxPixelSizeByHeight, maxPixelSizeByWidth);

    let newCanvasHeight = maxPixelSize * maxPixelHeight + 40
    let newCanvasWidth = maxPixelSize * maxPixelWidth + 40

    canvas.height=newCanvasHeight
    canvas.width=newCanvasWidth

    let randomizeCreatureColorsButton = document.getElementById("randomizeCreatureColors");

    let colorModTable = document.getElementById("color-modding-table");
    let colorModTableHeaderRow = document.createElement("tr");
    let colorModTableHueSliderRow = document.createElement("tr");
    let colorModTableSaturationSliderRow = document.createElement("tr");
    let colorModTableBrightnessliderRow = document.createElement("tr");
    let colorModTableRandomizeColorButtonRow = document.createElement("tr");
    let colorModTableRandomizeHueButtonRow = document.createElement("tr");
    let colorModTableResetHueButtonRow = document.createElement("tr");
    let colorModTableUniformHueButtonRow = document.createElement("tr");

    colorModTableHeaderRow.appendChild(document.createElement("th"))
    colorModTable.appendChild(colorModTableHeaderRow)

    let td = document.createElement("td")
    td.innerHTML = "Hue Sliders:"
    colorModTableHueSliderRow.appendChild(td)
    colorModTable.appendChild(colorModTableHueSliderRow)

    td = document.createElement("td")
    td.innerHTML = "Saturation Sliders:"
    colorModTableSaturationSliderRow.appendChild(td)
    colorModTable.appendChild(colorModTableSaturationSliderRow)

    td = document.createElement("td")
    td.innerHTML = "Brightness Sliders:"
    colorModTableBrightnessliderRow.appendChild(td)
    colorModTable.appendChild(colorModTableBrightnessliderRow)

    td = document.createElement("td")
    td.innerHTML = "Randomize Colors:"
    colorModTableRandomizeColorButtonRow.appendChild(td)
    colorModTable.appendChild(colorModTableRandomizeColorButtonRow)

    td = document.createElement("td")
    td.innerHTML = "Randomize Hues:"
    colorModTableRandomizeHueButtonRow.appendChild(td)
    colorModTable.appendChild(colorModTableRandomizeHueButtonRow)

    td = document.createElement("td")
    td.innerHTML = "Reset Colors:"
    colorModTableResetHueButtonRow.appendChild(td)
    colorModTable.appendChild(colorModTableResetHueButtonRow)

    td = document.createElement("td")
    td.innerHTML = "Uniform Hues:"
    colorModTableUniformHueButtonRow.appendChild(td)
    colorModTable.appendChild(colorModTableUniformHueButtonRow)

    console.log({colorGroups})
    colorGroups.push(colors.map((color, index) => index))
    console.log({colorGroups})

    let hueSliders = []
    let saturationSliders = []
    let brightnessSliders = []
    let uniformHueButtons = []
    let resetColorButtons = []
    let randomizeColorButtons = []
    let randomizeHueButtons = []
    let colorModifierArray = []


    for (let i = 0; i < colorGroups.length; i++) {
        // console.log("GROUP " + i)
        // let colorGroupIndices = colorGroups[i];

        // let colorGroupColorMods = {}
        // colorModifierArray.push(colorGroupColorMods)

        // let minBrightness = 1
        // let maxBrightness = 0
        // let minSaturation = 1
        // let maxSaturation = 0

        // for (let colorIndex of colorGroupIndices) {
        //     let color = colors[colorIndex];
        //     let hsl = ColorModifiers.rgbToHSL(color);
        //     console.log("  sat: " + Math.round(hsl.s * 100) + ", bri: " + Math.round(hsl.l * 100))
        //     minBrightness = Math.min(minBrightness, hsl.l)
        //     maxBrightness = Math.max(maxBrightness, hsl.l)
        //     minSaturation = Math.min(minSaturation, hsl.s)
        //     maxSaturation = Math.max(maxSaturation, hsl.s)
        // }

        // colorGroupColorMods.minSaturationChange = -0 // -0.1 - minSaturation
        // colorGroupColorMods.maxSaturationChange = 0 // 1.1 - maxSaturation
        // colorGroupColorMods.minBrightnessChange = -2 // -0.1 - minBrightness
        // colorGroupColorMods.maxBrightnessChange = 2 // 1.1 - maxBrightness

        // console.log({
        //     minBrightness,
        //     maxBrightness,
        //     minSaturation,
        //     maxSaturation,
        // })

        let colorGroupNum = i + 1
        let colorGroupID = i < colorGroups.length - 1 ? `Group ${colorGroupNum}` : "All"
        let td = document.createElement("th")
        td.innerHTML=`${colorGroupID} Colors`
        colorModTableHeaderRow.appendChild(td)

        let hueSlider = document.createElement("input");
        hueSlider.id = `hueSliderGroup${colorGroupNum}`
        hueSlider.classList.add('slider')
        hueSlider.classList.add('slider-hue')
        hueSlider.type="range"
        hueSlider.min="-180"
        hueSlider.max="180"
        td = document.createElement("td")
        td.appendChild(hueSlider)
        colorModTableHueSliderRow.appendChild(td)
        hueSliders.push(hueSlider)

        let saturationSlider = document.createElement("input");
        saturationSlider.id = `saturationSliderGroup${colorGroupNum}`
        saturationSlider.classList.add('slider')
        saturationSlider.classList.add('slider-saturation')
        saturationSlider.type="range"
        saturationSlider.min="-100"
        saturationSlider.max="100"
        td = document.createElement("td")
        td.appendChild(saturationSlider)
        saturationSliders.push(saturationSlider)
        colorModTableSaturationSliderRow.appendChild(td)

        let brightnessSlider = document.createElement("input");
        brightnessSlider.id = `brightnessSliderGroup${colorGroupNum}`
        brightnessSlider.classList.add('slider')
        brightnessSlider.classList.add('slider-brightness')
        brightnessSlider.type="range"
        brightnessSlider.min="-100"
        brightnessSlider.max="100"
        td = document.createElement("td")
        td.appendChild(brightnessSlider)
        brightnessSliders.push(brightnessSlider)
        colorModTableBrightnessliderRow.appendChild(td)

        let uniformHueButton = document.createElement("button");
        uniformHueButton.innerHTML = `Remove outlier colors in ${colorGroupID}`
        uniformHueButton.title=`Set all ${colorGroupID} colors to the same hue`
        td = document.createElement("td")
        td.appendChild(uniformHueButton)
        colorModTableUniformHueButtonRow.appendChild(td)
        uniformHueButtons.push(uniformHueButton);

        let resetColorButton = document.createElement("button");
        resetColorButton.innerHTML = `Reset Colors (${colorGroupID})`
        resetColorButton.title=`Reset ${colorGroupID} colors to their original color`
        td = document.createElement("td")
        td.appendChild(resetColorButton)
        colorModTableResetHueButtonRow.appendChild(td)
        resetColorButtons.push(resetColorButton);
        
        let randomizeColorButton = document.createElement("button");
        randomizeColorButton.innerHTML = `Randomize Colors (${colorGroupID})`
        randomizeColorButton.title=`Randomize Saturation, Brightness and Hue of ${colorGroupID} colors`
        td = document.createElement("td")
        td.appendChild(randomizeColorButton)
        colorModTableRandomizeColorButtonRow.appendChild(td)
        randomizeColorButtons.push(randomizeColorButton)
        
        let randomizeHueButton = document.createElement("button");
        randomizeHueButton.innerHTML = `Randomize Hues (${colorGroupID})`
        randomizeHueButton.title=`Randomize Hue of ${colorGroupID} colors (keep saturation and brightness as is)`
        td = document.createElement("td")
        td.appendChild(randomizeHueButton)
        colorModTableRandomizeHueButtonRow.appendChild(td)
        randomizeHueButtons.push(randomizeHueButton)
    }

    // let hueGroupASlider = document.getElementById("hueGroupASlider")
    // let hueGroupBSlider = document.getElementById("hueGroupBSlider")
    // let saturationColorGroupASlider = document.getElementById("saturationcolorGroupASlider")
    // let saturationColorGroupBSlider = document.getElementById("saturationcolorGroupBSlider")
    // let brightnessColorGroupASlider = document.getElementById("brightnesscolorGroupASlider")
    // let brightnessColorGroupBSlider = document.getElementById("brightnesscolorGroupBSlider")
    // let uniformColorGroupBHuesButton = document.getElementById("uniformColorGroupBHues");
    // let uniformColorGroupAHuesButton = document.getElementById("uniformColorGroupAHues");
    // let resetColorGroupAColorsButton = document.getElementById("resetColorGroupAColors");
    // let resetColorGroupBColorsButton = document.getElementById("resetColorGroupBColors");
    // let randomizeColorGroupAColorsButton = document.getElementById("randomizeColorGroupAColors");
    // let randomizeColorGroupBColorsButton = document.getElementById("randomizeColorGroupBColors");
    // let randomizeColorGroupAHuesButton = document.getElementById("randomizeColorGroupAHues");
    // let randomizeColorGroupBHuesButton = document.getElementById("randomizeColorGroupBHues");

    let resetSliders = () => {
        for (let slider of hueSliders) {
            slider.value = 0;
        }
        for (let slider of brightnessSliders) {
            slider.value = 0;
        }
        for (let slider of saturationSliders) {
            slider.value = 0;
        }
    }

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
        let row = colorHexTable.insertRow(i);
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
                span: span,
                colorIndex: i
            }
        );
    }

    // let creature = new Creature(creatureImages, creatureColors, defaultCreatureColors, canvas, ctx, colorGroupAIndices, creatureTableRows, yamlOptionName, backgroundColorInCanvas, textarea, resetSliders, colorModifiers);
    let creature = new Creature(creatureImages, creatureColors, defaultCreatureColors, canvas, ctx, colorGroups, creatureTableRows, yamlOptionName, backgroundColorInCanvas, textarea, resetSliders, mainColorsPerGroup, firstColorIndexInYamlOption, maxPixelSize);

    for (let i = 0; i < creatureTableRows.length; i++) {
        creatureTableRows[i].input.addEventListener("input", () => { creature.draw() });
        creatureTableRows[i].input.addEventListener("change", () => { creature.saveCurrentColors() })
    }

    canvas.addEventListener("click", () => { creature.changeAnimation(/*saveGifHelper*/) }, false);


    for (let colorGroupIndex = 0; colorGroupIndex < colorGroups.length; colorGroupIndex++) {
        let hueSlider = hueSliders[colorGroupIndex]
        if (colorGroupIndex === hueSliders.length - 1) {
            hueSlider.addEventListener("input", () => { creature.setAllColorsRelativeHue(Number.parseInt(hueSlider.value)) })
        } else {
            hueSlider.addEventListener("input", () => { creature.setColorGroupRelativeHues(Number.parseInt(hueSlider.value), colorGroupIndex ) })
        }
        hueSlider.addEventListener("change", () => { creature.saveCurrentColors() })

        let saturationSlider = saturationSliders[colorGroupIndex]
        if (colorGroupIndex === saturationSliders.length - 1) {
            saturationSlider.addEventListener("input", () => { creature.changeAllSaturation(Number.parseFloat(saturationSlider.value / 100)) })
        } else {
            saturationSlider.addEventListener("input", () => { creature.setColorGroupRelativeSaturation(Number.parseFloat(saturationSlider.value / 100), colorGroupIndex ) })
        }
        saturationSlider.addEventListener("change", () => { creature.saveCurrentColors() })

        let brightnessSlider = brightnessSliders[colorGroupIndex]
        if (colorGroupIndex === brightnessSliders.length - 1) {
            brightnessSlider.addEventListener("input", () => { creature.changeAllBrightness(Number.parseFloat(brightnessSlider.value / 100)) })
        } else {
            brightnessSlider.addEventListener("input", () => { creature.setColorGroupRelativeBrightness(Number.parseFloat(brightnessSlider.value / 100), colorGroupIndex ) })
        }
        brightnessSlider.addEventListener("change", () => { creature.saveCurrentColors() })

        let uniformHueButton = uniformHueButtons[colorGroupIndex];
        uniformHueButton.addEventListener("click", () => { creature.uniformHuesOfGroup(colorGroupIndex) });
        let resetColorButton = resetColorButtons[colorGroupIndex];
        resetColorButton.addEventListener("click", () => { creature.resetColorGroupToDefault(colorGroupIndex) });
        let randomizeColorButton = randomizeColorButtons[colorGroupIndex];
        if (colorGroupIndex === colorGroups.length - 1) {
            randomizeColorButton.addEventListener("click", () => { creature.randomizeAllColorQualities() });
        } else {
            randomizeColorButton.addEventListener("click", () => {creature.randomizeGroupColorQualities(colorGroupIndex)});
        }
        let randomizeHueButton = randomizeHueButtons[colorGroupIndex];
        if (colorGroupIndex === colorGroups.length - 1) {
            randomizeHueButton.addEventListener("click", () => {creature.randomizeHues()});
        } else {
            randomizeHueButton.addEventListener("click", () => {creature.randomizeHueOfGroup(colorGroupIndex)});
        }
    }

    pixelSizeSlider.max=`${maxPixelSize}`
    pixelSizeSlider.addEventListener("input", () => { creature.setPixelSize(pixelSizeSlider.value) })



    randomizeCreatureColorsButton.addEventListener("click", () => { creature.randomizeHues() });
    // chaosCreatureButton.addEventListener("click", () => { creature.chaosButton() });
    randomizeCreatureEverythingButton.addEventListener("click", () => { creature.randomizeAllColorQualities() });

    saveGifButton.addEventListener("click", () => { creature.saveGif(maxPixelSize) })


    

    resetSliders();

    creature.changeAnimation();
}
