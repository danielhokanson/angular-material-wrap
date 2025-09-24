// Search Result Interface
export interface SearchResult {
    id: string;
    title: string;
    name?: string;
    description?: string;
    summary?: string;
    data: any;
    score?: number;
    highlights?: { [key: string]: string[] };
    date?: Date;
    category?: string;
}
