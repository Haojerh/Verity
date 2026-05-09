package com.Verity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatsCardDTO {
    String title;
    long value;
    String icon;
    String color;
}
