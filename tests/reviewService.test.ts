import * as reviewService from "../src/api/v1/services/reviewService";
import * as repositoryModule from '../src/api/v1/repositories/firestoreRepository';

jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Review Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllReviews', () => {
        it('should retrieve all reviews successfully', async () => {
            // Arrange
            const mockData = [
                {id: 100, cdId: 1, comment: "Loved this song", rating: 5},
                {id: 101, cdId: 2, comment: "Didn't like the song", rating: 1}
            ];
            const mockRepositoryResponse = {
                docs: mockData.map(review => ({
                    id: review.id.toString(),
                    data: () => ({
                        cdId: review.cdId,
                        comment: review.comment,
                        rating: review.rating,
                    })
                }))
            };
            (repositoryModule.getDocuments as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result = await reviewService.getAllReviews();

            // Assert
            expect(repositoryModule.getDocuments).toHaveBeenCalledWith("reviews");
            expect(result).toEqual(mockData);
        });
    });

    describe('createReview', () => {
        it('should create a review successfully', async () => {
            // Arrange
            const newReview = {
                cdId: 3, 
                comment: "Liked the song", 
                rating: 4 
            };
            (repositoryModule.createDocument as jest.Mock).mockResolvedValue("103");

            // Act
            const result = await reviewService.createReview(newReview);

            // Assert
            expect(repositoryModule.createDocument).toHaveBeenCalledWith("reviews", newReview);
            expect(result).toEqual({
                id: 103,
                ...newReview
            });
        });
    });

    describe('deleteReview', () => {
        it('should delete a review successfully', async () => {
            // Arrange
            const mockReview = {
                id: "102",
                data: () => ({
                    cdId: 2, 
                    comment: "Didn't like the song", 
                    rating: 1
                })
            };
            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockReview);
            (repositoryModule.deleteDocument as jest.Mock).mockResolvedValue(null);

            // Act
            const result = await reviewService.deleteReview(102);

            // Assert
            expect(repositoryModule.deleteDocument).toHaveBeenCalledWith("reviews", "102");
            expect(result).toBe(true);
        });
    });
});