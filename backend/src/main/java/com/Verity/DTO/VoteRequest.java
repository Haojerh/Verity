package com.Verity.DTO;

import lombok.Data;

@Data
public class VoteRequest {
    private String voterID;
    private int voteValue; // 1 for Up, -1 for Down, 0 for Remove
}
