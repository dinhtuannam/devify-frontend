import { Timestamps } from './CommomType';

export interface LevelType extends Timestamps {
    courseLevelId: string;
    levelName: string;
    levelDescription: string;
    status: number;
}
