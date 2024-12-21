package com.techforb.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "readingData")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReadingData {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String country;
  private String plant;
  private Integer readings;
  private Integer midAlerts;
  private Integer redAlerts;
  private Integer disabled;
}
