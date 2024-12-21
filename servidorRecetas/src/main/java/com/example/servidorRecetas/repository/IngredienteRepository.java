package com.example.servidorRecetas.repository;

import com.example.servidorRecetas.model.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
    // Add custom query methods here if needed
}