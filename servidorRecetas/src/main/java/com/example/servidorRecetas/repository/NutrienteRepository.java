package com.example.servidorRecetas.repository;

import com.example.servidorRecetas.model.Nutriente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutrienteRepository extends JpaRepository<Nutriente, Long> {
    // Add custom query methods here if needed
}