package com.techforb.backend.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.techforb.backend.models.ReadingData;
import com.techforb.backend.models.DTOs.ReadingDataCreateDTO;
import com.techforb.backend.models.DTOs.ReadingDataEditDTO;
import com.techforb.backend.models.DTOs.TotalReadings;

public interface IDataService {
  ReadingData getData(Integer id);

  List<ReadingData> getAllData();

  void createData(ReadingDataCreateDTO data);

  boolean editData(ReadingDataEditDTO newData);

  void deleteData(Integer id);

  TotalReadings getTotals();
  Page<ReadingData> getAllWithPages(Integer page);
}
