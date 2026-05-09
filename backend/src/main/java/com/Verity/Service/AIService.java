package com.Verity.Service;

import com.Verity.DTO.CommentDTO;
import com.Verity.Entity.PostEntity;
import com.Verity.Repo.PostRepo;
import com.google.common.collect.ImmutableList;
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

    public String generateDebateSummary(String postID) {
        Map<String, CommentDTO> highlights = consensusService.getConsensusHighlights(postID);
        PostEntity post = postRepo.findById(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        String proText = highlights.get("pros") != null ? highlights.get("pros").getText() : "No arguments.";
        String conText = highlights.get("cons") != null ? highlights.get("cons").getText() : "No arguments.";

        Client client = Client.builder().apiKey(apiKey).build();

        // Prompt for the summary
        String prompt = String.format(
                "Analyze the debate: %s. Team %s argues: %s. Team %s argues: %s. " +
                        "Provide a concise 3-sentence neutral summary of the main points and any common ground.",
                post.getTitle(), post.getProLabel(), proText, post.getConLabel(), conText
        );

        try {
            GenerateContentConfig config = GenerateContentConfig.builder()
                    .thinkingConfig(ThinkingConfig.builder().thinkingLevel("MEDIUM").build())
                    .build();

            GenerateContentResponse response = client.models.generateContent(
                    "gemini-2.0-flash",
                    ImmutableList.of(Content.builder().role("user")
                            .parts(ImmutableList.of(Part.fromText(prompt))).build()),
                    config
            );

            return response.text();
        } catch (Exception e) {
            return "The AI is currently reflecting on the debate. Please try again shortly.";
        }
    }
}