/**
 * Represents borrowed status.
 */
export interface BorrowedStatus{
    id: number;
    cdId: number;
    status: "borrowed" | "available";
    dateBorrowed: string;
    dateReturned?: string;
}