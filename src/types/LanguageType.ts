import { Timestamps } from './CommomType';

export interface LanguageType extends Timestamps {
    languageId: string;
    name: string;
    status: number;
}
