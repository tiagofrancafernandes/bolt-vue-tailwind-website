export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    limit: number;
}
