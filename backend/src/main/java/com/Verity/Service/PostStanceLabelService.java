package com.Verity.Service;

import com.Verity.Entity.PostEntity;
import org.springframework.stereotype.Service;

@Service
public class PostStanceLabelService {

    public String normalizeStance(String stance) {
        if (stance == null) {
            return null;
        }

        String trimmed = stance.trim().toUpperCase();
        if (trimmed.equals("PRO") || trimmed.equals("PROS")) {
            return "PROS";
        }

        if (trimmed.equals("CON") || trimmed.equals("CONS")) {
            return "CONS";
        }

        throw new IllegalArgumentException("Invalid stance value: " + stance + ". Allowed values: PROS, CONS.");
    }

    public String resolveLabel(PostEntity post, String chosenStance) {
        if (post == null || chosenStance == null) {
            return null;
        }

        String normalized = normalizeStance(chosenStance);
        if (normalized.equals("PROS")) {
            return post.getProLabel();
        }

        if (normalized.equals("CONS")) {
            return post.getConLabel();
        }

        return null;
    }
}
