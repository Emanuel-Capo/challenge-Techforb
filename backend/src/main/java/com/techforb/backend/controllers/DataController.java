package com.techforb.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.techforb.backend.models.ReadingData;
import com.techforb.backend.models.DTOs.ReadingDataCreateDTO;
import com.techforb.backend.models.DTOs.ReadingDataEditDTO;
import com.techforb.backend.models.DTOs.TotalReadings;
import com.techforb.backend.services.IDataService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/data")
public class DataController {
  @Autowired
  private IDataService _dataService;

  @GetMapping()
  public ResponseEntity<List<ReadingData>> getAll() {
    List<ReadingData> dataGet = _dataService.getAllData();
    return new ResponseEntity<>(dataGet, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ReadingData> getById(@PathVariable Integer id) {
    ReadingData data = _dataService.getData(id);
    if (data != null) {
      return new ResponseEntity<>(data, HttpStatus.OK);
    }
    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
  }

  @PostMapping()
  public ResponseEntity<?> postData(@Valid @RequestBody ReadingDataCreateDTO data) {
    _dataService.createData(data);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @PutMapping()
  public ResponseEntity<?> put(@Valid @RequestBody ReadingDataEditDTO newData) {
    boolean result = _dataService.editData(newData);
    if (result) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable Integer id) {
    _dataService.deleteData(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @GetMapping("/total")
  public ResponseEntity<TotalReadings> getTotal() {
    TotalReadings dataGet = _dataService.getTotals();
    return new ResponseEntity<>(dataGet, HttpStatus.OK);
  }

  @GetMapping("/pages/{page}")
  public ResponseEntity<Page<ReadingData>> getAllWithPages(@PathVariable Integer page) {
    Page<ReadingData> dataGet = _dataService.getAllWithPages(page);
    return new ResponseEntity<>(dataGet, HttpStatus.OK);
  }
}
