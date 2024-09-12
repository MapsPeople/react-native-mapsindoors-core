export default class MPLabelGraphic {
    private constructor(
        public readonly backgroundImage: string,
        public readonly stretchX: number[][],
        public readonly stretchY: number[][],
        public readonly content: number[]
    ) { }

    public static create(object: MPLabelGraphicParams): MPLabelGraphic {
        return new MPLabelGraphic(
            object.backgroundImage,
            object.stretchX,
            object.stretchY,
            object.content,
        );
    }
}

export interface MPLabelGraphicParams {
    backgroundImage: string;
    stretchX: number[][];
    stretchY: number[][];
    content: number[];
}