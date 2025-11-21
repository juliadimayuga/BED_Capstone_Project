import * as equipmentService from "../src/api/v1/services/equipmentService";
import * as repositoryModule from '../src/api/v1/repositories/firestoreRepository';

jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Equipment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllEquipment', () => {
    it('should retrieve all equipment successfully', async () => {
      // Arrange
      const mockData = [
        { id: 1, name: "Treadmill", brand: "Brand1", type: "Cardio", hasBeenScheduled: false },
        { id: 2, name: "Yoga Mat", brand: "Brand2", type: "Flexibility", hasBeenScheduled: true },
        { id: 3, name: "Weights", brand: "Brand3", type: "Strength", hasBeenScheduled: false }
      ];
      const mockRepositoryResponse = {
        docs: mockData.map(equipment => ({
          id: equipment.id.toString(),
          data: () => ({
            name: equipment.name,
            brand: equipment.brand,
            type: equipment.type,
            hasBeenScheduled: equipment.hasBeenScheduled
          })
        }))
      };
      (repositoryModule.getDocuments as jest.Mock).mockResolvedValue(mockRepositoryResponse);

      // Act
      const result = await equipmentService.getAllEquipment();

      // Assert
      expect(repositoryModule.getDocuments).toHaveBeenCalledWith("equipment");
      expect(result).toEqual(mockData);
    });
  });

  describe('createEquipment', () => {
    it('should create equipment successfully', async () => {
      // Arrange
      const newEquipment = {
        name: "New Equipment",
        brand: "New Brand",
        type: "New Type",
        hasBeenScheduled: false
      };
      (repositoryModule.createDocument as jest.Mock).mockResolvedValue("4");

      // Act
      const result = await equipmentService.createEquipment(newEquipment);

      // Assert
      expect(repositoryModule.createDocument).toHaveBeenCalledWith("equipment", newEquipment, expect.any(String));
      expect(result).toEqual({
        id: expect.any(Number),
        ...newEquipment
      });
    });
  });

  describe('updateEquipment', () => {
    it('should update equipment successfully', async () => {
      // Arrange
      const updatedData = { hasBeenScheduled: true };
      const updatedEquipment = { id: 1, ...updatedData };
      (repositoryModule.updateDocument as jest.Mock).mockResolvedValue(updatedEquipment);

      // Act
      const result = await equipmentService.updateEquipment(1, updatedData);

      // Assert
      expect(repositoryModule.updateDocument).toHaveBeenCalledWith("equipment", "1", updatedData);
      expect(result).toEqual(updatedEquipment);
    });
  });

  describe('deleteEquipment', () => {
    it('should delete equipment successfully', async () => {
      // Arrange
      const mockEquipment = {
        id: "3",
        data: () => ({
          name: "Weights",
          brand: "Brand3",
          type: "Strength",
          hasBeenScheduled: false
        })
      };
      (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockEquipment);
      (repositoryModule.deleteDocument as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await equipmentService.deleteEquipment(3);

      // Assert
      expect(repositoryModule.deleteDocument).toHaveBeenCalledWith("equipment", "3");
      expect(result).toBe(true);
    });
  });
});