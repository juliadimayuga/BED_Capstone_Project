import * as scheduleService from "../src/api/v1/services/scheduleRecordService";
import * as repositoryModule from '../src/api/v1/repositories/firestoreRepository';

jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Schedule Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllSchedules', () => {
    it('should retrieve all scheduled equipment successfully', async () => {
      // Arrange
      const mockData = [
        {id: 1000, equipmentId: 1, startDate: "2025-01-02T10:00:00.000Z", endDate: "2025-01-09T10:00:00.000Z"},
        {id: 1001, equipmentId: 2, startDate: "2025-01-03T12:00:00.000Z", endDate: "2025-01-10T12:00:00.000Z"}
      ];
      const mockRepositoryResponse = {
        docs: mockData.map(record => ({
          id: record.id.toString(),
          data: () => ({
            equipmentId: record.equipmentId,
            startDate: record.startDate,
            endDate: record.endDate
          })
        }))
      };
      (repositoryModule.getDocuments as jest.Mock).mockResolvedValue(mockRepositoryResponse);

      // Act
      const result = await scheduleService.getAllSchedules();

      // Assert
      expect(repositoryModule.getDocuments).toHaveBeenCalledWith("scheduleRecords");
      expect(result).toEqual(mockData);
    });
  });

  describe('createScheduleRecord', () => {
    it('should create a schedule record successfully', async () => {
      // Arrange
      const newRecord = {
        equipmentId: 3,
        startDate: "2025-01-04T08:00:00.000Z",
        endDate: "2025-01-11T08:00:00.000Z"
      };
      (repositoryModule.createDocument as jest.Mock).mockResolvedValue("1003");

      // Act
      const result = await scheduleService.createScheduleRecord(newRecord);

      // Assert
      expect(repositoryModule.createDocument).toHaveBeenCalledWith("scheduleRecords", newRecord, "1003");
      expect(result).toEqual({
        id: 1003,
        ...newRecord
      });
    });
  });

  describe('updateScheduleRecord', () => {
    it('should update a schedule record successfully', async () => {
      // Arrange
      const updatedData = {
        startDate: "2025-01-05T09:00:00.000Z",
        endDate: "2025-01-12T09:00:00.000Z"
      };
      const updatedRecord = {
        id: 1000,
        ...updatedData
      };
      (repositoryModule.updateDocument as jest.Mock).mockResolvedValue(updatedRecord);

      // Act
      const result = await scheduleService.updateScheduleRecord(1000, updatedData);

      // Assert
      expect(repositoryModule.updateDocument).toHaveBeenCalledWith("scheduleRecords", "1000", updatedData);
      expect(result).toEqual(updatedRecord);
    });
  });

  describe('deleteScheduleRecord', () => {
    it('should delete a schedule record successfully', async () => {
      // Arrange
      const mockRecord = {
        id: "1001",
        data: () => ({
          equipmentId: 2,
          startDate: "2025-01-03T12:00:00.000Z",
          endDate: "2025-01-10T12:00:00.000Z"
        })
      };
      (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockRecord);
      (repositoryModule.deleteDocument as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await scheduleService.deleteScheduleRecord(1001);

      // Assert
      expect(repositoryModule.deleteDocument).toHaveBeenCalledWith("scheduleRecords", "1001");
      expect(result).toBe(true);
    });
  });
});