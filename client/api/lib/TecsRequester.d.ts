export type ArchitectureEnum = '64' | '86';

export interface TecnologyDTO {
    title: string | null;
    description: string | null;
    dependences: string[] | null;
    downloadUrl: string | null;
    imageUrl: string | null;
    architecture: ArchitectureEnum | null;
}