import { FieldValue, Timestamp } from "firebase-admin/firestore";

/**
 * Types used for data.
 */
export type FirestoreDataTypes =
    | string
    | number
    | boolean
    | null
    | Timestamp
    | FieldValue;