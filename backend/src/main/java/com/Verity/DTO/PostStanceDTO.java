package com.Verity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostStanceDTO {
    private long prosVotes;
    private long consVotes;
    private long totalParticipants;
}