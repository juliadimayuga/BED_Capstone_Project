/**
 * Represents records to schedule times to use equipment.
 */
export interface ScheduleRecord{
    id: number;
    equipmentId: number;
    startDate: string;
    endDate: string;
}