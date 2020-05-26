namespace SpriteKind {
    //% isKind
    export const Text = SpriteKind.create();
}

//% blockNamespace="textsprite"
//% blockGap=8
class TextSprite extends Sprite {
    constructor(
        public text: string,
        public bg: number,
        public fg: number,
        public font: image.Font,
        public borderWidth: number,
        public borderColor: number,
        public padding: number,
        public icon: Image = null,
    ) {
        super(image.create(0,0));
        this.setKind(SpriteKind.Text);
        this.update()
    }

    public update() {
        const iconWidth = this.icon ? this.icon.width : 0;
        const iconHeight = this.icon ? this.icon.height : 0;
        const borderAndPadding = this.borderWidth + this.padding
        const width = iconWidth + this.font.charWidth * this.text.length + 2 * borderAndPadding;
        const height = Math.max(iconHeight, this.font.charHeight) + 2 * borderAndPadding;
        const img = image.create(width, height);
        img.fill(this.borderColor);
        img.fillRect(this.borderWidth, this.borderWidth, width - this.borderWidth * 2, height - this.borderWidth * 2, this.bg)
        if (this.icon) {
            const iconHeightOffset = (height - iconHeight) / 2
            renderScaledImage(this.icon, img, borderAndPadding, iconHeightOffset)
        }
        const textHeightOffset = (height - this.font.charHeight) / 2
        img.print(this.text, iconWidth + borderAndPadding, textHeightOffset, this.fg, this.font);
        this.setImage(img)        
    }

    //% block="set $this(textSprite) font height $height"
    public setFontHeight(height: FontHeight) {
        if (height % 8 === 0) {
            this.font = image.scaledFont(image.font8, height / 8);
        } else {
            this.font = image.scaledFont(image.font5, height / 5);
        }
        this.update();
    }

    //% block="set $this(textSprite) icon $icon=screen_image_picker"
    public setIcon(icon: Image) {
        this.icon = icon
        this.update()
    }

    //% block="set $this(textSprite) text $text"
    public setText(text: string) {
        this.text = text || ""
        this.update()
    }

    //% block="set $this(textSprite) border $width $color=colorindexpicker || and padding $padding"
    public setBorder(width: number, color: number, padding: number = 0) {
        this.borderWidth = Math.max(width, 0);
        this.borderColor = color;
        this.padding = Math.max(padding, 0);
        this.update()
    }
}

// TODO: downscale and upscale icons?
function renderScaledImage(source: Image, destination: Image, x: number, y: number, downScalePowerOfTwo: number = 0) {
    const scale = downScalePowerOfTwo;
    const tile = source
    for (let i = 0; i < source.width; i += 1 << scale) {
        for (let j = 0; j < source.height; j += 1 << scale) {
            if (source.getPixel(i, j) != 0) {
                destination.setPixel(x + (i >> scale), y + (j >> scale), source.getPixel(i, j))
            }
        }
    }
}

enum FontHeight {
    Five = 5,
    Eight = 8,
    Ten = 10,
    Fifteen = 15,
    Sixteen = 16,
    Twenty = 20,
    Twentyfour = 24,
    TwentyFive = 25,
    Thirty = 30,
    ThirtyTwo = 32,
    ThirtyFive = 35,
    Forty = 40,
    FortyFive = 45,
    FortyEight = 48,
    Fifty = 50,
    FiftyFive = 55,
    FiftySix = 56,
    Sixty = 60,
    SixtyFour = 64
}

//% color=#3e99de
//% icon="\uf031"
//% blockGap=8 block="Text Sprite"
//% groups='["Create"]'
namespace textsprite {

    //% block="text sprite $text || as $fg on $bg"
    //% blockId="textsprite_create"
    //% blockSetVariable="textSprite"
    //% expandableArgumentMode="toggle"
    //% bg.defl=0
    //% bg.shadow="colorindexpicker"
    //% fg.defl=1
    //% fg.shadow="colorindexpicker"
    //% group="Create"
    //% weight=100
    export function create(
        text: string,
        bg: number = 0,
        fg: number = 1,
    ): TextSprite {
        const font = image.font8;
        const sprite = new TextSprite(text, bg, fg, font, 0, 0, 0);
        return sprite;
    }
}