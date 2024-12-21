package com.example.servidorRecetas.repository;

import com.example.servidorRecetas.model.Receta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {

    // List<Receta> findByKetoTrue();
}