import {Equipment} from "../models/equipmentModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const EQUIPMENT_COLLECTION = "equipment";

/**
 * Retrieves all equipment
 * @returns Array of all equipment
 * @throws {Error} - If an error occurs during retrieval of equipment
 */
export const getAllEquipment = async (): Promise<Equipment[]> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(EQUIPMENT_COLLECTION);
        const equipment: Equipment[] = snapshot.docs.map(doc => ({
            id: Number(doc.id), 
            ...(doc.data() as Omit<Equipment, "id">)
        }));
        return equipment;
    }
    catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get equipment: ${errorMessage}`
        );
    }
};

/**
 * Retrieves equipment by ID
 * @param id - The id of the equipment to retrieve
 * @returns The equipment that was retrieved or null if not found
 * @throws {Error} - If an error occurs during the equipment retrieval
 */
export const getEquipmentById = async (id: number): Promise<Equipment | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            EQUIPMENT_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }
        return {id, ...(doc.data() as Omit<Equipment, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get equipment ${id}: ${errorMessage}`);
    }
};

/**
 * Creates new equipment
 * @param equipmentData - Only the fields needed to create equipment
 * @returns The created equipment
 * @throws {Error} - If an error occurs during the equipment creation
 */
export const createEquipment = async (equipmentData: Omit<Equipment, "id">
): Promise<Equipment> => {
    try{
        const id = Date.now();
        await firestoreRepository.createDocument(
            EQUIPMENT_COLLECTION,
            equipmentData,
            id.toString()
        );
        return {id: Number(id), ...equipmentData};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create equipment: ${errorMessage}`);
    }
};

/**
 * Updates existing equipment
 * @param id - The ID of the equipment to update
 * @param equipmentData - Only fields that can be updated
 * @returns The updated equipment or null if not found
 * @throws {Error} - If an error occurs during equipment update
 */
export const updateEquipment = async (
    id: number,
    equipmentData: Pick<Equipment, "hasBeenScheduled">
): Promise<Equipment | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            EQUIPMENT_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.updateDocument(
            EQUIPMENT_COLLECTION,
            id.toString(),
            equipmentData
        );
        return {id, ...(equipmentData as Omit<Equipment, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update equipment ${id}: ${errorMessage}`);
    }
};

/**
 * Deletes equipment
 * @param id - The ID of the equipment to delete
 * @returns True if the equipment was deleted successfully or null if not found
 * @throws {Error} - If an error occurs during equipment deletion
 */
export const deleteEquipment = async (id: number
): Promise<boolean | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            EQUIPMENT_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.deleteDocument(
            EQUIPMENT_COLLECTION,
            id.toString(),
        );
        return true;
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete equipment ${id}: ${errorMessage}`);
    }
};