package com.example.servidorRecetas.repository;

import com.example.servidorRecetas.model.IngredienteNutriente;
import com.example.servidorRecetas.model.IngredienteNutrienteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredienteNutrienteRepository
        extends JpaRepository<IngredienteNutriente, IngredienteNutrienteId> {
    // Add custom query methods here if needed
}