export interface PostModel {
    id: number;
    title: string;
    anons: string;
    fullText: string;
    lastChange: Date;
    accountId: number;
    categoryId: number;
    accountLogin: string;
    categoryName: string;
}
