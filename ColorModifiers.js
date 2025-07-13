class ColorModifiers {

    static getAverageBrightness(colors) {
        let total = 0;
        for (let color of colors) {
            var hsl = this.rgbToHSL(color);
            total += hsl.l;
        }
        return total / colors.length;
    }

    static getAverageSaturation(colors) {
        let total = 0;
        for (let color of colors) {
            var hsl = this.rgbToHSL(color);
            total += hsl.s;
        }
        return total / colors.length;
    }

    static shiftColorHueByDegree(rgb, degree) {
        var hsl = this.rgbToHSL(rgb);
        hsl.h += degree;
        if (hsl.h > 360) {
            hsl.h -= 360;
        }
        else if (hsl.h < 0) {
            hsl.h += 360;
        }
        return this.hslToRGB(hsl);
    }

    static setHueFromColor(rgbTo, rgbFrom) {
        var hsl = this.rgbToHSL(rgbTo);
        var hsl2 = this.rgbToHSL(rgbFrom).h;
        hsl.h = hsl2;
        if (hsl.h > 360) {
            hsl.h -= 360;
        }
        else if (hsl.h < 0) {
            hsl.h += 360;
        }
        return this.hslToRGB(hsl);
    }

    static getBrightComplimentaryColor(rgb) {
        var hsl = this.rgbToHSL(rgb);
        hsl.h = (hsl.h + 180) % 360;
        hsl.s = 1;
        hsl.l = .5;
        return this.hslToRGB(hsl);
    }

    static setSaturation(rgb, newSaturation) {
        var hsl = this.rgbToHSL(rgb);
        hsl.s = newSaturation;
        if (hsl.s > 1) {
            hsl.s = 1;
        }
        else if (hsl.s < 0) {
            hsl.s = 0;
        }
        return this.hslToRGB(hsl);
    }

    static shiftColorSaturationByDegree(rgb, degree) {
        var hsl = this.rgbToHSL(rgb);
        hsl.s += degree;
        if (hsl.s > 1) {
            hsl.s = 1;
        }
        else if (hsl.s < 0) {
            hsl.s = 0;
        }
        return this.hslToRGB(hsl);
    }

    static setBrightness(rgb, newBrightness) {
        var hsl = this.rgbToHSL(rgb);
        hsl.l = newBrightness;
        if (hsl.l > 1) {
            hsl.l = 1;
        }
        else if (hsl.l < 0) {
            hsl.l = 0;
        }
        return this.hslToRGB(hsl);
    }

    static shiftColorBrightnessByDegree(rgb, degree) {
        var hsl = this.rgbToHSL(rgb);
        hsl.l += degree;
        if (hsl.l > 1) {
            hsl.l = 1;
        }
        else if (hsl.l < 0) {
            hsl.l = 0;
        }
        return this.hslToRGB(hsl);
    }

    static reverseBrightness(rgb) {
        var hsl = this.rgbToHSL(rgb);
        hsl.l = -hsl.l + 1;
        if (hsl.l > 1) {
            hsl.l = 1;
        }
        else if (hsl.l < 0) {
            hsl.l = 0;
        }
        return this.hslToRGB(hsl);
    }

    static reverseSaturation(rgb) {
        var hsl = this.rgbToHSL(rgb);
        hsl.s = -hsl.s + 1;
        if (hsl.s > 1) {
            hsl.s = 1;
        }
        else if (hsl.s < 0) {
            hsl.s = 0;
        }
        return this.hslToRGB(hsl);
    }

    // exepcts a string and returns an object
    static rgbToHSL(rgb) {
        // strip the leading # if it's there
        rgb = rgb.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (rgb.length == 3) {
            rgb = rgb.replace(/(.)/g, '$1$1');
        }

        var r = parseInt(rgb.substr(0, 2), 16) / 255,
            g = parseInt(rgb.substr(2, 2), 16) / 255,
            b = parseInt(rgb.substr(4, 2), 16) / 255,
            cMax = Math.max(r, g, b),
            cMin = Math.min(r, g, b),
            delta = cMax - cMin,
            l = (cMax + cMin) / 2,
            h = 0,
            s = 0;

        if (delta == 0) {
            h = 0;
        }
        else if (cMax == r) {
            h = 60 * (((g - b) / delta) % 6);
        }
        else if (cMax == g) {
            h = 60 * (((b - r) / delta) + 2);
        }
        else {
            h = 60 * (((r - g) / delta) + 4);
        }

        if (delta == 0) {
            s = 0;
        }
        else {
            s = (delta / (1 - Math.abs(2 * l - 1)))
        }

        return {
            h: h,
            s: s,
            l: l
        }
    }

    // expects an object and returns a string
    static hslToRGB(hsl) {
        var h = hsl.h,
            s = hsl.s,
            l = hsl.l,
            c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r, g, b;

        if (h < 60) {
            r = c;
            g = x;
            b = 0;
        }
        else if (h < 120) {
            r = x;
            g = c;
            b = 0;
        }
        else if (h < 180) {
            r = 0;
            g = c;
            b = x;
        }
        else if (h < 240) {
            r = 0;
            g = x;
            b = c;
        }
        else if (h < 300) {
            r = x;
            g = 0;
            b = c;
        }
        else {
            r = c;
            g = 0;
            b = x;
        }

        r = this.normalize_rgb_value(r, m);
        g = this.normalize_rgb_value(g, m);
        b = this.normalize_rgb_value(b, m);

        return this.rgbToHex(r, g, b);
    }

    static normalize_rgb_value(color, m) {
        color = Math.floor((color + m) * 255);
        if (color < 0) {
            color = 0;
        }
        return color;
    }

    static rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

}