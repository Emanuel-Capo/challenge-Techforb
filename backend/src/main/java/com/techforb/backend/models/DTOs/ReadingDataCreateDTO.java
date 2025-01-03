package com.techforb.backend.models.DTOs;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReadingDataCreateDTO {
  @NotBlank
  private String country;
  @NotBlank
  private String plant;
  @NotBlank
  private String countryCode;
}
