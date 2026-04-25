package com.verity.backend.repository;

import com.verity.backend.model.Debate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DebateRepository extends JpaRepository<Debate, Long> {

    // For simple list results
    @Query("SELECT d FROM Debate d WHERE LOWER(d.title) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(d.description) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Debate> searchDebates(@Param("q") String q);
    
    // For paginated results
    @Query("SELECT d FROM Debate d WHERE LOWER(d.title) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(d.description) LIKE LOWER(CONCAT('%', :q, '%'))")
    Page<Debate> searchDebatesPaginated(@Param("q") String q, Pageable pageable);
}
