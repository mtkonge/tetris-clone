export enum BlockType {
    Empty,
    Using,
    Obstructed,
}

export interface Block {
    color: string;
    value: BlockType;
}
