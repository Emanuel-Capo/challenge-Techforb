package com.techforb.backend.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReadingDataEditDTO {
  private Integer id;
  private Integer readings;
  private Integer midAlerts;
  private Integer redAlerts;
  private Integer disabled;
}
