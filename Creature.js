class Creature {

    constructor(animationImages, colorObjects, defaultColors, canvas, context, colorGroupAIndices, tableRows, yamlKey, backgroundColor, textarea, resetSliders, randomizationModifiers) {
        this.animationMSPerFrame = 100;
        this.colorObjects = colorObjects;
        this.canvas = canvas;
        this.ctx = context;
        this.defaultColors = defaultColors;
        this.currentColors = defaultColors.map(it => it);
        this.currentImageIndex = 0;
        this.animationImages = animationImages;
        this.tableRows = tableRows;
        this.colorGroupAIndices = colorGroupAIndices;
        this.yamlKey = yamlKey;
        this.isAnimating = false;
        this.animationInterval = null;
        this.pixelSize = 10;
        this.backgroundColor = backgroundColor;
        this.textarea = textarea;
        this.mediaRecorder = null;
        this.recordedChunks = null;
        this.gifFrame = -1;
        this.resetSliders = resetSliders;
        this.randomizationModifiers = randomizationModifiers;

        // this.startAnimation();
    }

    setPixelSize(newPixelSize) {
        this.pixelSize = newPixelSize;
        this.draw();
    }

    saveCurrentColors() {
        for (let i = 0; i < this.tableRows.length; i++) {
            this.currentColors[i] = this.tableRows[i].input.value
        }
        this.resetSliders();
    }

    setAllColorsRelativeHue(newHueInt) {
        // let newHueInt = Number.parseInt(hueSlider.value);
        for (let i = 0; i < this.tableRows.length; i++) {
            this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.currentColors[i], newHueInt)
        }
        this.draw();
    }

    changeAllBrightness(newBrightnessValue) {
        // let newBrightnessValue = Number.parseFloat(brightnessSlider.value);
        for (let i = 0; i < this.tableRows.length; i++) {
            this.tableRows[i].input.value = ColorModifiers.shiftColorBrightnessByDegree(this.currentColors[i], newBrightnessValue)
        }
        this.draw();
    }

    changeAllSaturation(newSaturationValue) {
        // let newSaturationValue = Number.parseFloat(saturationSlider.value);
        for (let i = 0; i < this.tableRows.length; i++) {
            this.tableRows[i].input.value = ColorModifiers.shiftColorSaturationByDegree(this.currentColors[i], newSaturationValue)
        }
        this.draw();
    }

    uniformColorGroupAHues() {
        let color = -1;
        if (this.tableRows.length === 15) {
            for (let i = 0; i < this.tableRows.length; i++) {
                if (this.isGroupAColor(i)) {
                    if (color == -1) {
                        color = this.currentColors[i]
                    }
                    this.tableRows[i].input.value = ColorModifiers.setHueFromColor(this.tableRows[i].input.value, color);
                }
            }
        } else {
        for (let i = this.tableRows.length - 1; i >= 0; i--) {
            if (this.isGroupAColor(i)) {
                if (color == -1) {
                    color = this.currentColors[i]
                }
                this.tableRows[i].input.value = ColorModifiers.setHueFromColor(this.tableRows[i].input.value, color);
            }
        }}
        this.saveCurrentColors()
        this.draw();
    }

    uniformColorGroupBHues() {
        let color = -1;
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                if (color == -1) {
                    color = this.currentColors[i]
                }
                this.tableRows[i].input.value = ColorModifiers.setHueFromColor(this.tableRows[i].input.value, color)
            }
        }
        this.saveCurrentColors()
        this.draw();
    }

    isGroupAColor(i) {
        return this.colorGroupAIndices.indexOf(i) !== -1;
    }

    isGroupBColor(i) {
        return !this.isGroupAColor(i);
    }

    setColorGroupARelativeHues(hueDegree) {
        // let hueDegree = Number.parseInt(bodySlider.value);
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupAColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.currentColors[i], hueDegree)
            }
        }
        this.draw();
    }

    setColorGroupARelativeBrightness(brightnessDegree) {
        // let brightnessDegree = Number.parseFloat(brightnessColorGroupASlider.value);
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupAColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorBrightnessByDegree(this.currentColors[i], brightnessDegree)
            }
        }
        this.draw();
    }

    setColorGroupARelativeSaturation(saturationDegree) {
        // let saturationDegree = Number.parseFloat(saturationColorGroupASlider.value);
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupAColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorSaturationByDegree(this.currentColors[i], saturationDegree)
            }
        }
        this.draw();
    }

    setColorGroupBRelativeHue(hueDegree) {
        // let num = Number.parseInt(feetSlider.value);
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.currentColors[i], hueDegree)
            }
        }
        this.draw();
    }


    setColorGroupBRelativeSaturation(saturationDegree) {
        // let saturationDegree = Number.parseFloat(saturationColorGroupBSlider.value);
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorSaturationByDegree(this.currentColors[i], saturationDegree)
            }
        }
        this.draw();
    }

    setColorGroupBRelativeBrightness(brightnessDegree) {
        // let brightnessDegree = Number.parseFloat(brightnessColorGroupBSlider.value);
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorBrightnessByDegree(this.currentColors[i], brightnessDegree)
            }
        }
        this.draw();
    }

    randomizeColors() {
        let randomRelativeGroupBColorHueDegree = Math.random() * 360;
        let randomRelativeGroupAColorHueDegree = Math.random() * 360;

        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupAColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.tableRows[i].input.value, randomRelativeGroupAColorHueDegree)
            } else {
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.tableRows[i].input.value, randomRelativeGroupBColorHueDegree)
            }
        }
        this.saveCurrentColors()
        this.draw()
    }

    randomizeGroupAHues() {
        let randomRelativeGroupAColorHueDegree = Math.random() * 360;

        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupAColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.tableRows[i].input.value, randomRelativeGroupAColorHueDegree)
            }
        }
        this.saveCurrentColors()
        this.draw()
    }

    randomizeGroupBHues() {
        let randomRelativeGroupBColorHueDegree = Math.random() * 360;

        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.tableRows[i].input.value, randomRelativeGroupBColorHueDegree)
            }
        }
        this.saveCurrentColors()
        this.draw()
    }

    reverseSaturationOfGroupAAndColorGroupB() {
        for (let i = 0; i < this.tableRows.length; i++) {
            this.tableRows[i].input.value = ColorModifiers.reverseSaturation(this.tableRows[i].input.value)
        }
    }

    reverseColorGroupBSaturation() {
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.reverseSaturation(this.tableRows[i].input.value)
            }
        }
    }

    reverseColorGroupASaturation() {
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupAColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.reverseSaturation(this.tableRows[i].input.value)
            }
        }
    }

    reverseBrightnessOfGroupAAndColorGroupB() {
        for (let i = 0; i < this.tableRows.length; i++) {
            this.tableRows[i].input.value = ColorModifiers.reverseBrightness(this.tableRows[i].input.value)
        }
    }

    reverseColorGroupBBrightness() {
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.reverseBrightness(this.tableRows[i].input.value)
            }
        }
    }

    reverseColorGroupABrightness() {
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupAColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.reverseBrightness(this.tableRows[i].input.value)
            }
        }
    }

    chaosButton() {
        let random = Math.random() * 8;
        if (random < 1) {
            this.reverseSaturationOfGroupAAndColorGroupB()
        }
        else if (random < 2) {
            this.reverseBrightnessOfGroupAAndColorGroupB()
        }
        else if (random < 3) {
            this.reverseColorGroupABrightness()
        }
        else if (random < 4) {
            this.reverseColorGroupBBrightness()
        }
        else if (random < 5) {
            this.reverseColorGroupASaturation()
        }
        else if (random < 6) {
            this.reverseColorGroupBSaturation()
        } else if (random < 8) {
            this.uniformColorGroupAHues();
            this.uniformColorGroupBHues();
        }
        this.saveCurrentColors()
        this.draw()
    }

    randomizeAllColorQualities() {
        let randomReset = Math.random() * 10;
        if (randomReset < 7) {
            this.resetAllColorsToDefault()
        } else if (randomReset < 8) {
            this.resetColorGroupAToDefault()
        } else if (randomReset < 9) {
            this.resetColorGroupBToDefault()
        }


        let randomColorGroupBHueDegree = Math.random() * 360;
        let randomColorGroupAHueDegree = Math.random() * 360;
        let randomColorGroupBSaturation = Math.random() * this.randomizationModifiers.saturationGroupARange + this.randomizationModifiers.saturationGroupAStart; 
        let randomColorGroupASaturation = Math.random() * this.randomizationModifiers.saturationGroupBRange + this.randomizationModifiers.saturationGroupBStart;
        let randomColorGroupABrightness = Math.random() * this.randomizationModifiers.brightnessGroupARange + this.randomizationModifiers.brightnessGroupAStart;
        let randomColorGroupBBrightness = Math.min(Math.random() * this.randomizationModifiers.brightnessGroupBRange + this.randomizationModifiers.brightnessGroupBStart, randomColorGroupABrightness);

        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorBrightnessByDegree(this.tableRows[i].input.value, randomColorGroupBBrightness)
                this.tableRows[i].input.value = ColorModifiers.shiftColorSaturationByDegree(this.tableRows[i].input.value, randomColorGroupBSaturation)
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.tableRows[i].input.value, randomColorGroupBHueDegree)
            } else {
                this.tableRows[i].input.value = ColorModifiers.shiftColorBrightnessByDegree(this.tableRows[i].input.value, randomColorGroupABrightness)
                this.tableRows[i].input.value = ColorModifiers.shiftColorSaturationByDegree(this.tableRows[i].input.value, randomColorGroupASaturation)
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.tableRows[i].input.value, randomColorGroupAHueDegree)
            }
        }
        this.saveCurrentColors()

        let randomUniform = Math.random() * 10;
        if (this.tableRows.length === 15 && randomUniform < 9) {
            this.tableRows[1].input.value = ColorModifiers.shiftColorSaturationByDegree(ColorModifiers.shiftColorBrightnessByDegree(this.tableRows[13].input.value, Math.random() * .3 - .05), Math.random() * .3 - .05)
            if (randomUniform < 3) {
                this.uniformColorGroupAHues()
            } else if (randomUniform < 6) {
                this.tableRows[1].input.value = ColorModifiers.setHueFromColor(this.tableRows[13].input.value, this.tableRows[1].input.value)
            }
            this.saveCurrentColors()
        }
        if (this.tableRows.length === 9 && randomUniform < 9) {
            this.tableRows[0].input.value = ColorModifiers.shiftColorSaturationByDegree(ColorModifiers.shiftColorBrightnessByDegree(this.tableRows[1].input.value, Math.random() * .15 - .18), Math.random() * .25 - .28)
            if (randomUniform < 3) {
                this.uniformColorGroupAHues()
            } else if (randomUniform < 8) {
                this.tableRows[0].input.value = ColorModifiers.setHueFromColor(this.tableRows[1].input.value, this.tableRows[0].input.value)
            }
            this.saveCurrentColors()
        }
        this.draw()
    }

    randomizeGroupAColorQualities() {
        let randomReset = Math.random() * 10;
        if (randomReset < 8) {
            this.resetColorGroupAToDefault()
        }

        let randomColorGroupAHueDegree = Math.random() * 360;
        let randomColorGroupASaturation = Math.random() * this.randomizationModifiers.saturationGroupBRange + this.randomizationModifiers.saturationGroupBStart;
        let randomColorGroupABrightness = Math.random() * this.randomizationModifiers.brightnessGroupARange + this.randomizationModifiers.brightnessGroupAStart;

        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupAColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorBrightnessByDegree(this.tableRows[i].input.value, randomColorGroupABrightness)
                this.tableRows[i].input.value = ColorModifiers.shiftColorSaturationByDegree(this.tableRows[i].input.value, randomColorGroupASaturation)
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.tableRows[i].input.value, randomColorGroupAHueDegree)
            }
        }
        this.saveCurrentColors()

        let randomUniform = Math.random() * 10;
        if (this.tableRows.length === 15 && randomUniform < 9) {
            this.tableRows[1].input.value = ColorModifiers.shiftColorSaturationByDegree(ColorModifiers.shiftColorBrightnessByDegree(this.tableRows[13].input.value, Math.random() * .3 - .05), Math.random() * .3 - .05)
            if (randomUniform < 3) {
                this.uniformColorGroupAHues()
            } else if (randomUniform < 6) {
                this.tableRows[1].input.value = ColorModifiers.setHueFromColor(this.tableRows[13].input.value, this.tableRows[1].input.value)
            }
            this.saveCurrentColors()
        }
        if (this.tableRows.length === 9 && randomUniform < 9) {
            this.tableRows[0].input.value = ColorModifiers.shiftColorSaturationByDegree(ColorModifiers.shiftColorBrightnessByDegree(this.tableRows[1].input.value, Math.random() * .15 - .18), Math.random() * .25 - .28)
            if (randomUniform < 3) {
                this.uniformColorGroupAHues()
            } else if (randomUniform < 8) {
                this.tableRows[0].input.value = ColorModifiers.setHueFromColor(this.tableRows[1].input.value, this.tableRows[0].input.value)
            }
            this.saveCurrentColors()
        }
        this.draw()
    }

    randomizeGroupBColorQualities() {
        let randomReset = Math.random() * 10;
        if (randomReset < 8) {
            this.resetColorGroupBToDefault()
        }

        let randomColorGroupBHueDegree = Math.random() * 360;
        let randomColorGroupBSaturation = Math.random() * this.randomizationModifiers.saturationGroupARange + this.randomizationModifiers.saturationGroupAStart; 
        let randomColorGroupBBrightness = Math.random() * this.randomizationModifiers.brightnessGroupBRange + this.randomizationModifiers.brightnessGroupBStart;

        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                this.tableRows[i].input.value = ColorModifiers.shiftColorBrightnessByDegree(this.tableRows[i].input.value, randomColorGroupBBrightness)
                this.tableRows[i].input.value = ColorModifiers.shiftColorSaturationByDegree(this.tableRows[i].input.value, randomColorGroupBSaturation)
                this.tableRows[i].input.value = ColorModifiers.shiftColorHueByDegree(this.tableRows[i].input.value, randomColorGroupBHueDegree)
            }
        }
        this.saveCurrentColors()
        this.draw()
    }

    

    resetColorGroupAToDefault() {
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupAColor(i)) {
                this.tableRows[i].input.value = this.defaultColors[i]
            }
        }
        this.saveCurrentColors()
        this.draw()
    }

    resetColorGroupBToDefault() {
        for (let i = 0; i < this.tableRows.length; i++) {
            if (this.isGroupBColor(i)) {
                this.tableRows[i].input.value = this.defaultColors[i]
            }
        }
        this.saveCurrentColors()
        this.draw()

    }

    resetAllColorsToDefault() {
        for (let i = 0; i < this.tableRows.length; i++) {
            this.tableRows[i].input.value = this.defaultColors[i]
        }
        this.saveCurrentColors()
        this.draw()
    }

    draw() {
        this.updateColorTableDisplay();

        let currentImage = this.animationImages[this.currentImageIndex];

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.beginPath(); // Start a new path
        this.ctx.rect(0, 0, 500, 500); // Add a rectangle to the current path
        this.ctx.fill(); // Render the path
        let maxPixelSize = (this.tableRows.length === 15) ? 20 : 10

        let topSpace = 20 + (maxPixelSize - this.pixelSize) * currentImage.length

        for (let y = 0; y < currentImage.length; y++) {
            for (let x = 0; x < currentImage[y].length; x++) {
                let color = currentImage[y] && currentImage[y][x] && currentImage[y][x].color ? currentImage[y][x].color : this.backgroundColor;

                this.ctx.fillStyle = color;
                this.ctx.beginPath(); // Start a new path
                this.ctx.rect(x * this.pixelSize + 20, y * this.pixelSize + topSpace, this.pixelSize, this.pixelSize); // Add a rectangle to the current path
                this.ctx.fill(); // Render the path
            }
        }
    }

    updateColorTableDisplay() {
        for (let i = 0; i < this.tableRows.length; i++) {
            this.colorObjects[i].color = this.tableRows[i].input.value;
            this.tableRows[i].span.innerHTML = `${i + 1}: ${this.tableRows[i].input.value}`;
        }

        let string = `  ${this.yamlKey}:`
        // for (let i = this.tableRows.length - 1; i >= 0; i--) {
            for (let i = 0; i < this.tableRows.length; i++) {
            string += `\n    '${i + 1}': '${this.tableRows[i].input.value.replace("#", "")}'`
        }
        this.textarea.value = string;
    }

    startAnimation() {
        this.animationInterval = setInterval(() => {
            this.currentImageIndex = ((this.currentImageIndex + 1) % this.animationImages.length);
            this.draw();
            if (this.gifFrame >= 0) {
                this.gifFrame++;
                console.log(this.gifFrame);
                if (this.gifFrame >= this.animationImages.length + 1) {
                    this.saveGifHelper();
                }
            }
        }, this.animationMSPerFrame);
        this.isAnimating = true;
    }

    stopAnimation() {
        if (this.gifFrame === -1) {
            clearInterval(this.animationInterval)
            this.isAnimating = false;
        }
    }

    changeAnimation() {
        if (this.isAnimating) {
            this.stopAnimation()
        } else {
            this.startAnimation();
        }
    }

    saveGif(maxPixelSize) {
        if (!this.isAnimating) {
            this.startAnimation()
        }
        this.setPixelSize(maxPixelSize)
        this.gifFrame = -1;
        this.saveGifHelper()
    }

    saveGifHelper() {
        if (this.gifFrame === -1) {
            console.log("start")
            this.gifFrame = 0;
            const stream = this.canvas.captureStream(this.animationMSPerFrame);
            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9',
                ignoreMutedMedia: true
            });
            this.recordedChunks = [];
            this.mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) {
                    this.recordedChunks.push(e.data);
                }
            };
            this.mediaRecorder.start();
        } else {
            console.log("end")
            this.gifFrame = -1;
            this.mediaRecorder.stop();
            setTimeout(() => {
                const blob = new Blob(this.recordedChunks, {
                    type: "video/webm"
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "recording.webm";
                a.click();
                URL.revokeObjectURL(url);
            }, 0);
        }
    }

}