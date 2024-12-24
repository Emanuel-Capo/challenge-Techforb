package com.techforb.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.techforb.backend.models.ReadingData;
import com.techforb.backend.models.DTOs.ReadingDataCreateDTO;
import com.techforb.backend.models.DTOs.ReadingDataEditDTO;
import com.techforb.backend.models.DTOs.TotalReadings;
import com.techforb.backend.repository.DataRepository;

@Service
public class DataService implements IDataService {
  @Autowired
  private DataRepository _dataRepository;

  @Override
  public ReadingData getData(Integer id) {
    return _dataRepository.findById(id).orElse(null);
  }

  @Override
  public List<ReadingData> getAllData() {
    return _dataRepository.findAll();
  }

  @Override
  public void createData(ReadingDataCreateDTO data) {
    ReadingData createData = ReadingData.builder()
        .country(data.getCountry())
        .plant(data.getPlant())
        .countryCode(data.getCountryCode())
        .readings(0)
        .midAlerts(0)
        .redAlerts(0)
        .disabled(0)
        .build();
    _dataRepository.save(createData);
  }

  @Override
  public void deleteData(Integer id) {
    _dataRepository.deleteById(id);
  }

  @Override
  public boolean editData(ReadingDataEditDTO newData) {
    ReadingData data = getData(newData.getId());
    if (data != null) {
      if (data.getReadings() != null)
        data.setReadings(newData.getReadings());
      if (data.getMidAlerts() != null)
        data.setMidAlerts(newData.getMidAlerts());
      if (data.getRedAlerts() != null)
        data.setRedAlerts(newData.getRedAlerts());
      if (data.getDisabled() != null)
        data.setDisabled(newData.getDisabled());
      _dataRepository.save(data);
      return true;
    }
    return false;
  }

  @Override
  public TotalReadings getTotals() {
    TotalReadings total = new TotalReadings(0,0,0,0);
    List<ReadingData> data = _dataRepository.findAll();
    data.forEach(plant->{
      total.setReadings(total.getReadings()+plant.getReadings());
      total.setMidAlerts(total.getMidAlerts()+plant.getMidAlerts());
      total.setRedAlerts(total.getRedAlerts()+plant.getRedAlerts());
      total.setDisabled(total.getDisabled()+plant.getDisabled());
    });
    return total;
  }

  @Override
  public Page<ReadingData> getAllWithPages(Integer page){
    final Pageable pageable = PageRequest.of(page, 5);
    return _dataRepository.findAll(pageable);
  }

}
