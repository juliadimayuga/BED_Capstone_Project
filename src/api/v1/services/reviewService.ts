import {Review} from "../models/reviewModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import { db } from "../../../../config/firebaseConfig";

const REVIEWS_COLLECTION = "reviews";

/**
 * Retrieves all reviews
 * @param fieldValuePairs - An array of field-value pairs to filter on
 * @returns Array of all reviews
 * @throws {Error} - If an error occurs during retrieval of reviews
 */
export const getAllReviews = async (
    fieldValuePairs: {fieldName: string; fieldValue: any}[] = []
): Promise<Review[]> => {
    try{
        let query: FirebaseFirestore.Query = db.collection(REVIEWS_COLLECTION);

        fieldValuePairs.forEach(({ fieldName, fieldValue }) => {
            query = query.where(fieldName, "==", fieldValue);
        });
        const snapshot = await query.get();
        const reviews: Review[] = snapshot.docs.map(doc => ({
            id: Number(doc.id), 
            ...(doc.data() as Omit<Review, "id">)
        }));
        return reviews;
    }
    catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get reviews: ${errorMessage}`
        );
    }
};

/**
 * Creates a new review
 * @param reviewData - Only the fields needed to create a review
 * @returns The created review
 * @throws {Error} - If an error occurs during the review creation
 */
export const createReview = async (reviewData: Omit<Review, "id">
): Promise<Review> => {
    try{
        const id = Date.now();
        await firestoreRepository.createDocument(
            REVIEWS_COLLECTION,
            reviewData,
            id.toString()
        );
        return {id: Number(id), ...reviewData};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create review: ${errorMessage}`);
    }
};

/**
 * Deletes a review
 * @param id - The ID of the review to delete
 * @returns True if the review was deleted successfully or null if not found
 * @throws {Error} - If an error occurs during review deletion
 */
export const deleteReview = async (id: number
): Promise<boolean | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            REVIEWS_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.deleteDocument(
            REVIEWS_COLLECTION,
            id.toString(),
        );
        return true;
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete review ${id}: ${errorMessage}`);
    }
};