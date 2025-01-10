package com.example.servidorRecetas.repository;

import com.example.servidorRecetas.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    // Add custom query methods here if needed
    Optional<Ingredient> findByName(String name);
}