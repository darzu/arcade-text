class TextSprite extends Sprite {
    constructor(
        public text: string,
        public bg: number,
        public fg: number,
        public font: image.Font,
    ) {
        super(image.create(0,0));
        this.update()
    }

    public update() {
        const width = this.font.charWidth * this.text.length;
        const height = this.font.charHeight;
        const img = image.create(width, height);
        img.fill(this.bg);
        img.print(this.text, 0, 0, this.fg, this.font);
        this.setImage(img)        
    }
}

// //% block
// export function createTextSprite(text: string, bg: number, fg: number) {
//     const font = image.font8;
//     const width = font.charWidth * text.length;
//     const height = font.charHeight;

//     const res = image.create(width, height);
//     res.fill(bg);
//     res.print(text, 0, 0, fg, font);

//     const sprite = sprites.create(res, SpriteKind.Food);
//     return sprite;
// }

//% color=#3e99de
//% icon="\uf031"
//% blockGap=8 block="Text Sprite"
//% groups='["Create"]'
namespace textsprite {
    //% block="text sprite $text ||as $fg on $bg"
    //% blockId="textsprite_create"
    //% blockSetVariable="textSprite"
    //% expandableArgumentMode="toggle"
    //% bg.defl=0
    //% fg.defl=1
    //% bg.shadow="colorindexpicker"
    //% fg.shadow="colorindexpicker"
    //% group="Create"
    //% weight=100
    export function create(
        text: string,
        bg: number = 0,
        fg: number = 1,
    ): TextSprite {
        const font = image.font8;
        const sprite = new TextSprite(text, bg, fg, font);
        return sprite;
    }
}