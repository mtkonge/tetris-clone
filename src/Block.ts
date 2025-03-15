export enum BlockType {
    Empty,
    Highlighted,
    Using,
    Obstructed,
}

export interface Block {
    color: string;
    value: BlockType;
}
