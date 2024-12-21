package com.techforb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techforb.backend.models.ReadingData;

@Repository
public interface DataRepository extends JpaRepository<ReadingData, Integer> {

}
