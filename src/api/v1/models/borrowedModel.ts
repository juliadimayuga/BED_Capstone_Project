/**
 * Represents borrowed status.
 */
export interface BorrowedStatus{
    id: number;
    cdId: string;
    status: "borrowed" | "available";
}