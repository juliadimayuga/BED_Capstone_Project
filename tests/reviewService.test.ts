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
                {id: 100, equipmentId: 1, comment: "Treadmill was fast", rating: 5},
                {id: 101, equipmentId: 2, comment: "Weights weren't heavy enough", rating: 1}
            ];
            const mockRepositoryResponse = {
                docs: mockData.map(review => ({
                    id: review.id.toString(),
                    data: () => ({
                        equipmentId: review.equipmentId,
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
                equipmentId: 3, 
                comment: "Liked the material", 
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
                    equipmentId: 2, 
                    comment: "Didn't like the design", 
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