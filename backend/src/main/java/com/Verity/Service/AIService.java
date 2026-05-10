package com.Verity.Service;

import com.Verity.DTO.CommentDTO;
import com.Verity.Entity.PostEntity;
import com.Verity.Repo.PostRepo;
import com.google.common.collect.ImmutableList;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import com.google.genai.Client;
import com.google.genai.types.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIService {
    private final ConsensusService consensusService;
    private final PostRepo postRepo;

    @Value("${gemini.api.key}")
    private String apiKey;

    private Client client;

    // Initialize the client once so you don't rebuild it 100 times
    @PostConstruct
    public void init() {
        this.client = Client.builder().apiKey(apiKey).build();
    }

    public String generateDebateSummary(String postID) {
        Map<String, CommentDTO> highlights = consensusService.getConsensusHighlights(postID);
        PostEntity post = postRepo.findById(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        String proText = highlights.get("pros") != null ? highlights.get("pros").getText() : "No arguments.";
        String conText = highlights.get("cons") != null ? highlights.get("cons").getText() : "No arguments.";

        String prompt = String.format(
                "Analyze the debate: %s. Team %s argues: %s. Team %s argues: %s. " +
                        "Provide a concise 3-sentence neutral summary of the main points and any common ground.",
                post.getTitle(), post.getProLabel(), proText, post.getConLabel(), conText
        );

        try {
            GenerateContentConfig config = GenerateContentConfig.builder()
                    .temperature(0.7F)
                    .build();

            GenerateContentResponse response = client.models.generateContent(
                    "gemini-2.5-flash",
                    java.util.List.of(Content.builder().role("user")
                            .parts(java.util.List.of(Part.fromText(prompt))).build()),
                    config
            );

            return response.text();
        } catch (Exception e) {
            // Log the actual error so you can see it in IntelliJ
            System.err.println("Gemini Error: " + e.getMessage());
            return "The AI is currently reflecting on the debate. Please try again shortly.";
        }
    }
}
