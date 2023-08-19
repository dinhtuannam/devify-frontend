export interface DetailCreatorPublicDTO {
    creatorId: string;
    slug: string;
    aboutMe?: string;
    facebookUrl?: string;
    linkedInUrl?: string;
    displayName: string;
    image: string;
}

export interface CreatorCoursesDTO {
    courseId: string;
    title: string;
    description: string;
    price: number;
    slug?: string | null;
    image: string;
}
