import {CD} from "../models/cdModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const CDS_COLLECTION = "cds";

/**
 * Retrieves all CDs
 * @returns Array of all CDs
 * @throws {Error} - If an error occurs during retrieval of CDs
 */
export const getAllCds = async (): Promise<CD[]> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(CDS_COLLECTION);
        const cds: CD[] = snapshot.docs.map(doc => ({
            id: Number(doc.id), 
            ...(doc.data() as Omit<CD, "id">)
        }));
        return cds;
    }
    catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get CDs: ${errorMessage}`
        );
    }
};

/**
 * Retrieves CD by ID
 * @param id - The id of the CD to retrieve
 * @returns The CD that was retrieved or null if not found
 * @throws {Error} - If an error occurs during the CD retrieval
 */
export const getCdById = async (id: number): Promise<CD | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            CDS_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }
        return {id, ...(doc.data() as Omit<CD, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get CD ${id}: ${errorMessage}`);
    }
};

/**
 * Creates a new CD
 * @param cdData - Only the fields needed to create an CD
 * @returns The created CD
 * @throws {Error} - If an error occurs during the CD creation
 */
export const createCd = async (cdData: Omit<CD, "id">
): Promise<CD> => {
    try{
        const id = Date.now();
        await firestoreRepository.createDocument(
            CDS_COLLECTION,
            cdData,
            id.toString()
        );
        return {id: Number(id), ...cdData};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create CD: ${errorMessage}`);
    }
};

/**
 * Updates an existing CD
 * @param id - The ID of the CD to update
 * @param cdData - Only fields that can be updated
 * @returns The updated CD or null if not found
 * @throws {Error} - If an error occurs during CD update
 */
export const updateCd = async (
    id: number,
    cdData: Pick<CD, "borrowed">
): Promise<CD | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            CDS_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.updateDocument(
            CDS_COLLECTION,
            id.toString(),
            cdData
        );
        return {id, ...(cdData as Omit<CD, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update CD ${id}: ${errorMessage}`);
    }
};

/**
 * Deletes an CD
 * @param id - The ID of the CD to delete
 * @returns True if the CD was deleted successfully or null if not found
 * @throws {Error} - If an error occurs during CD deletion
 */
export const deleteCd = async (id: number
): Promise<boolean | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            CDS_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.deleteDocument(
            CDS_COLLECTION,
            id.toString(),
        );
        return true;
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete CD ${id}: ${errorMessage}`);
    }
};