package com.techforb.backend.models.DTOs;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TotalReadings {
  private Integer readings;
  private Integer midAlerts;
  private Integer redAlerts;
  private Integer disabled;
}
