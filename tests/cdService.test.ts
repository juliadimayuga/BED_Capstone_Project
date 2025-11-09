import * as cdService from "../src/api/v1/services/cdService";
import * as repositoryModule from '../src/api/v1/repositories/firestoreRepository';

jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('CD Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCds', () => {
        it('should retrieve all CDs successfully', async () => {
            // Arrange
            const mockData = [
                {id: 1, title: "Song1", artist: "Singer1", genre: "Classical", borrowed: true},
                {id: 2, title: "Song2", artist: "Singer2", genre: "Country", borrowed: false},
                {id: 3, title: "Song3", artist: "Singer3", genre: "Jazz", borrowed: true}
            ];
            const mockRepositoryResponse = {
                docs: mockData.map(cd => ({
                    id: cd.id.toString(),
                    data: () => ({
                        title: cd.title,
                        artist: cd.artist,
                        genre: cd.genre,
                        borrowed: cd.borrowed
                    })
                }))
            };
            (repositoryModule.getDocuments as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result = await cdService.getAllCds();

            // Assert
            expect(repositoryModule.getDocuments).toHaveBeenCalledWith("cds");
            expect(result).toEqual(mockData);
        });
    });

    describe('createCd', () => {
        it('should create a CD successfully', async () => {
            // Arrange
            const newCd = {
                title: "New Title", 
                artist: "New Artist", 
                genre: "New Genre", 
                borrowed: false
            };
            (repositoryModule.createDocument as jest.Mock).mockResolvedValue("1");

            // Act
            const result = await cdService.createCd(newCd);

            // Assert
            expect(repositoryModule.createDocument).toHaveBeenCalledWith("cds", newCd);
            expect(result).toEqual({
                id: 1,
                ...newCd
            });
        });
    });

    describe('updateCd', () => {
        it('should update a CD successfully', async () => {
            // Arrange
            const updatedData = {
                borrowed: true
            };
            const updatedCd = {
                id: 1,
                ...updatedData
            };
            (repositoryModule.updateDocument as jest.Mock).mockResolvedValue(updatedCd);

            // Act
            const result = await cdService.updateCd(1, updatedData);

            // Assert
            expect(repositoryModule.updateDocument).toHaveBeenCalledWith("cds", "1", updatedData);
            expect(result).toEqual(updatedCd);
        });
    });

    describe('deleteCd', () => {
        it('should delete a CD successfully', async () => {
            // Arrange
            const mockCd = {
                id: "2",
                data: () => ({
                    title: "Song2", 
                    artist: "Artist2", 
                    genre: "Country", 
                    borrowed: false
                })
            };
            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockCd);
            (repositoryModule.deleteDocument as jest.Mock).mockResolvedValue(null);

            // Act
            const result = await cdService.deleteCd(2);

            // Assert
            expect(repositoryModule.deleteDocument).toHaveBeenCalledWith("cds", "2");
            expect(result).toBe(true);
        });
    });
});