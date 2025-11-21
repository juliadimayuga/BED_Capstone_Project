import {ScheduleRecord} from "../models/scheduleRecordModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const SCHEDULE_COLLECTION = "scheduleRecords";

/**
 * Retrieves all scheduled equipment records
 * @returns Array of all schedule records
 * @throws {Error} - If an error occurs during retrieval
 */
export const getAllSchedules = async (): Promise<ScheduleRecord[]> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(SCHEDULE_COLLECTION);
        const schedules: ScheduleRecord[] = snapshot.docs.map(doc => ({
            id: Number(doc.id), 
            ...(doc.data() as Omit<ScheduleRecord, "id">)
        }));
        return schedules;
    }
    catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get schedule records: ${errorMessage}`
        );
    }
};

/**
 * Creates a new schedule record
 * @param scheduleData - Only the fields needed to create a record
 * @returns The created record
 * @throws {Error} - If an error occurs during creation
 */
export const createScheduleRecord = async (scheduleData: Omit<ScheduleRecord, "id">
): Promise<ScheduleRecord> => {
    try{
        const id = Date.now();
        const starts = new Date(scheduleData.startDate).getTime();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const endDate = new Date(starts + oneWeek).toISOString();

        const record = {
            ...scheduleData,
            endDate
        };
        await firestoreRepository.createDocument(
            SCHEDULE_COLLECTION,
            record,
            id.toString()
        );
        return {id: Number(id), ...record};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create schedule record: ${errorMessage}`);
    }
};

/**
 * Updates an existing schedule record
 * @param id - The ID of the record to update
 * @param scheduleData - Only fields that can be updated
 * @returns The updated record or null if not found
 * @throws {Error} - If an error occurs during update
 */
export const updateScheduleRecord = async (
    id: number,
    scheduleData: Partial<ScheduleRecord>
): Promise<ScheduleRecord | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            SCHEDULE_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.updateDocument(
            SCHEDULE_COLLECTION,
            id.toString(),
            scheduleData
        );
        return {id, ...(scheduleData as Omit<ScheduleRecord, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update schedule record ${id}: ${errorMessage}`);
    }
};

/**
 * Deletes a schedule record
 * @param id - The ID of the record to delete
 * @returns True if the record was deleted successfully or null if not found
 * @throws {Error} - If an error occurs during deletion
 */
export const deleteScheduleRecord = async (id: number
): Promise<boolean | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            SCHEDULE_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.deleteDocument(
            SCHEDULE_COLLECTION,
            id.toString(),
        );
        return true;
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete schedule record ${id}: ${errorMessage}`);
    }
};