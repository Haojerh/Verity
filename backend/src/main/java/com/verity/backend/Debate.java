package com.verity.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "debates")
public class Debate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String poster;

    private LocalDate date;

    private int prosVotes;
    private int consVotes;

    private String prosSide;
    private String consSide;

    private int commentCount;

    // 🔥 store images as simple list
    @ElementCollection
    private List<String> images;

    // Constructors
    public Debate() {}

    // Getters & Setters

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPoster() { return poster; }
    public void setPoster(String poster) { this.poster = poster; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public int getProsVotes() { return prosVotes; }
    public void setProsVotes(int prosVotes) { this.prosVotes = prosVotes; }

    public int getConsVotes() { return consVotes; }
    public void setConsVotes(int consVotes) { this.consVotes = consVotes; }

    public String getProsSide() { return prosSide; }
    public void setProsSide(String prosSide) { this.prosSide = prosSide; }

    public String getConsSide() { return consSide; }
    public void setConsSide(String consSide) { this.consSide = consSide; }

    public int getCommentCount() { return commentCount; }
    public void setCommentCount(int commentCount) { this.commentCount = commentCount; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
}