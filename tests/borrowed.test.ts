import * as borrowedService from "../src/api/v1/services/borrowedService";
import * as repositoryModule from '../src/api/v1/repositories/firestoreRepository';

jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Borrowed Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBorrowed', () => {
        it('should retrieve all borrowed CDs successfully', async () => {
            // Arrange
            const mockData = [
                {id: 1000, cdId: 1, status: "borrowed", dateBorrowed: "2025-01-02T00:00:00.000Z", dateReturned: undefined},
                {id: 1001, cdId: 2, status: "available", dateBorrowed: "2025-01-01T00:00:00.000Z", dateReturned: "2025-01-07T00:00:00.000Z"}
            ];
            const mockRepositoryResponse = {
                docs: mockData.map(borrowed => ({
                    id: borrowed.id.toString(),
                    data: () => ({
                        cdId: borrowed.cdId,
                        status: borrowed.status,
                        dateBorrowed: borrowed.dateBorrowed,
                        dateReturned: borrowed.dateReturned
                    })
                }))
            };
            (repositoryModule.getDocuments as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result = await borrowedService.getAllBorrowed();

            // Assert
            expect(repositoryModule.getDocuments).toHaveBeenCalledWith("borrowed");
            expect(result).toEqual(mockData);
        });
    });

    describe('createBorrowedRecord', () => {
        it('should create a record successfully', async () => {
            // Arrange
            const newRecord = {
                cdId: 3, 
                status: "borrowed" as "borrowed", 
                dateBorrowed: "2025-01-03T00:00:00.000Z", 
                dateReturned: undefined
            };
            (repositoryModule.createDocument as jest.Mock).mockResolvedValue("1003");

            // Act
            const result = await borrowedService.createBorrowedRecord(newRecord);

            // Assert
            expect(repositoryModule.createDocument).toHaveBeenCalledWith("borrowed", newRecord, "1003");
            expect(result).toEqual({
                id: 1003,
                ...newRecord
            });
        });
    });

    describe('updateBorrowedRecord', () => {
        it('should update a record successfully', async () => {
            // Arrange
            const updatedData = {
                status: "available" as "available",
                dateReturned: "2025-01-11T00:00:00.000Z"
            };
            const updatedRecord = {
                id: 1000,
                ...updatedData
            };
            (repositoryModule.updateDocument as jest.Mock).mockResolvedValue(updatedRecord);

            // Act
            const result = await borrowedService.updateBorrowedRecord(1000, updatedData);

            // Assert
            expect(repositoryModule.updateDocument).toHaveBeenCalledWith("borrowed", "1000", updatedData);
            expect(result).toEqual(updatedRecord);
        });
    });

    describe('deleteBorrowedRecord', () => {
        it('should delete a record successfully', async () => {
            // Arrange
            const mockRecord = {
                id: "1000",
                data: () => ({
                    cdId: 2, 
                    status: "available" as "available", 
                    dateBorrowed: "2025-01-02T00:00:00.000Z", 
                    dateReturned: "2025-01-11T00:00:00.000Z"
                })
            };
            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockRecord);
            (repositoryModule.deleteDocument as jest.Mock).mockResolvedValue(null);

            // Act
            const result = await borrowedService.deleteBorrowedRecord(1000);

            // Assert
            expect(repositoryModule.deleteDocument).toHaveBeenCalledWith("borrowed", "1000");
            expect(result).toBe(true);
        });
    });
});