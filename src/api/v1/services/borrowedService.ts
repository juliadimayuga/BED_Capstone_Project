import {BorrowedStatus} from "../models/borrowedModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const BORROWED_COLLECTION = "borrowed";


/**
 * Retrieves all borrowed CDs
 * @returns Array of all borrowed CDs
 * @throws {Error} - If an error occurs during retrieval of CDs
 */
export const getAllBorrowed = async (): Promise<BorrowedStatus[]> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(BORROWED_COLLECTION);
        const borrowed: BorrowedStatus[] = snapshot.docs.map(doc => ({
            id: Number(doc.id), 
            ...(doc.data() as Omit<BorrowedStatus, "id">)
        }));
        return borrowed;
    }
    catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get borrowed CDs: ${errorMessage}`
        );
    }
};

/**
 * Creates a new record
 * @param borrowedData - Only the fields needed to create a record
 * @returns The created record
 * @throws {Error} - If an error occurs during the record creation
 */
export const createBorrowedRecord = async (borrowedData: Omit<BorrowedStatus, "id">
): Promise<BorrowedStatus> => {
    try{
        const id = Date.now();
        await firestoreRepository.createDocument(
            BORROWED_COLLECTION,
            borrowedData,
            id.toString()
        );
        return {id: Number(id), ...borrowedData};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create record: ${errorMessage}`);
    }
};

/**
 * Updates an existing record
 * @param id - The ID of the record to update
 * @param borrowedData - Only fields that can be updated
 * @returns The updated record or null if not found
 * @throws {Error} - If an error occurs during record update
 */
export const updateBorrowedRecord = async (
    id: number,
    borrowedData: Partial<BorrowedStatus>
): Promise<BorrowedStatus | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            BORROWED_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.updateDocument(
            BORROWED_COLLECTION,
            id.toString(),
            borrowedData
        );
        return {id, ...(borrowedData as Omit<BorrowedStatus, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update record ${id}: ${errorMessage}`);
    }
};

/**
 * Deletes a record
 * @param id - The ID of the record to delete
 * @returns True if the record was deleted successfully or null if not found
 * @throws {Error} - If an error occurs during record deletion
 */
export const deleteBorrowedRecord = async (id: number
): Promise<boolean | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            BORROWED_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.deleteDocument(
            BORROWED_COLLECTION,
            id.toString(),
        );
        return true;
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete record ${id}: ${errorMessage}`);
    }
};