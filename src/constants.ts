import { Coordinate } from "./Coordinate";
import { RotationDirection } from "./RotationDirection";

interface WallKickTests {
    JLSTZ: WallKickTest[];
    I: WallKickTest[];
}

interface WallKickTest {
    rotation: number;
    direction: number;
    tests: Coordinate[];
}

export const COLS = 10;
export const ROWS = 20;
export const BLOCKSIZE = 25;

export const WALLKICKS: WallKickTests = {
    JLSTZ: [
        {
            rotation: 0,
            direction: RotationDirection.CounterClockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 0,
                },
                {
                    x: 1,
                    y: -1,
                },
                {
                    x: 0,
                    y: 2,
                },
                {
                    x: 1,
                    y: 2,
                },
            ],
        },
        {
            rotation: 0,
            direction: RotationDirection.Clockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: -1,
                    y: 0,
                },
                {
                    x: -1,
                    y: -1,
                },
                {
                    x: 0,
                    y: 2,
                },
                {
                    x: -1,
                    y: 2,
                },
            ],
        },
        {
            rotation: 1,
            direction: RotationDirection.CounterClockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 0,
                },
                {
                    x: 1,
                    y: 1,
                },
                {
                    x: 0,
                    y: -2,
                },
                {
                    x: 1,
                    y: -2,
                },
            ],
        },
        {
            rotation: 1,
            direction: RotationDirection.Clockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 0,
                },
                {
                    x: 1,
                    y: 1,
                },
                {
                    x: 0,
                    y: -2,
                },
                {
                    x: 1,
                    y: -2,
                },
            ],
        },
        {
            rotation: 2,
            direction: RotationDirection.CounterClockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: -1,
                    y: 0,
                },
                {
                    x: -1,
                    y: -1,
                },
                {
                    x: 0,
                    y: 2,
                },
                {
                    x: -1,
                    y: 2,
                },
            ],
        },
        {
            rotation: 2,
            direction: RotationDirection.Clockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 0,
                },
                {
                    x: 1,
                    y: -1,
                },
                {
                    x: 0,
                    y: 2,
                },
                {
                    x: 1,
                    y: 2,
                },
            ],
        },
        {
            rotation: 3,
            direction: RotationDirection.CounterClockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: -1,
                    y: 0,
                },
                {
                    x: -1,
                    y: 1,
                },
                {
                    x: 0,
                    y: -2,
                },
                {
                    x: -1,
                    y: -2,
                },
            ],
        },
        {
            rotation: 3,
            direction: RotationDirection.Clockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: -1,
                    y: 0,
                },
                {
                    x: -1,
                    y: 1,
                },
                {
                    x: 0,
                    y: -2,
                },
                {
                    x: -1,
                    y: -2,
                },
            ],
        },
    ],
    I: [
        {
            rotation: 0,
            direction: RotationDirection.CounterClockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: -1,
                    y: 0,
                },
                {
                    x: 2,
                    y: 0,
                },
                {
                    x: -1,
                    y: -2,
                },
                {
                    x: 2,
                    y: 1,
                },
            ],
        },
        {
            rotation: 0,
            direction: RotationDirection.Clockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: -2,
                    y: 0,
                },
                {
                    x: 1,
                    y: 0,
                },
                {
                    x: -2,
                    y: 1,
                },
                {
                    x: 1,
                    y: -2,
                },
            ],
        },
        {
            rotation: 1,
            direction: RotationDirection.CounterClockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 2,
                    y: 0,
                },
                {
                    x: -1,
                    y: 0,
                },
                {
                    x: 2,
                    y: -1,
                },
                {
                    x: -1,
                    y: 2,
                },
            ],
        },
        {
            rotation: 1,
            direction: RotationDirection.Clockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: -1,
                    y: 0,
                },
                {
                    x: 2,
                    y: 0,
                },
                {
                    x: -1,
                    y: -2,
                },
                {
                    x: 2,
                    y: 1,
                },
            ],
        },
        {
            rotation: 2,
            direction: RotationDirection.CounterClockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 0,
                },
                {
                    x: -2,
                    y: 0,
                },
                {
                    x: 1,
                    y: 2,
                },
                {
                    x: -2,
                    y: -1,
                },
            ],
        },
        {
            rotation: 2,
            direction: RotationDirection.Clockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 2,
                    y: 0,
                },
                {
                    x: -1,
                    y: 0,
                },
                {
                    x: 2,
                    y: -1,
                },
                {
                    x: -1,
                    y: 2,
                },
            ],
        },
        {
            rotation: 3,
            direction: RotationDirection.CounterClockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: -2,
                    y: 0,
                },
                {
                    x: 1,
                    y: 0,
                },
                {
                    x: -2,
                    y: 1,
                },
                {
                    x: 1,
                    y: -2,
                },
            ],
        },
        {
            rotation: 3,
            direction: RotationDirection.Clockwise,
            tests: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 0,
                },
                {
                    x: -2,
                    y: 0,
                },
                {
                    x: 1,
                    y: 2,
                },
                {
                    x: -2,
                    y: -1,
                },
            ],
        },
    ],
};
