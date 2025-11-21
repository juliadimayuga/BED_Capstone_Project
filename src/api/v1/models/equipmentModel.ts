/**
 * Represents Equipment at the Gym.
 */
export interface Equipment{
    id: number;
    name: string;
    brand: string;
    type: string;
    hasBeenScheduled: boolean;
}