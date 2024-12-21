package com.example.servidorRecetas.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class IngredienteNutrienteId implements Serializable {

    private Long ingredienteId;
    private Long nutrienteId;

    // Default constructor
    public IngredienteNutrienteId() {
    }

    // Constructor with parameters
    public IngredienteNutrienteId(Long ingredienteId, Long nutrienteId) {
        this.ingredienteId = ingredienteId;
        this.nutrienteId = nutrienteId;
    }

    // Getters and setters
    public Long getIngredienteId() {
        return ingredienteId;
    }

    public void setIngredienteId(Long ingredienteId) {
        this.ingredienteId = ingredienteId;
    }

    public Long getNutrienteId() {
        return nutrienteId;
    }

    public void setNutrienteId(Long nutrienteId) {
        this.nutrienteId = nutrienteId;
    }

    // Overriding equals() and hashCode() for proper comparison
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IngredienteNutrienteId that = (IngredienteNutrienteId) o;

        if (!ingredienteId.equals(that.ingredienteId)) return false;
        return nutrienteId.equals(that.nutrienteId);
    }

    @Override
    public int hashCode() {
        int result = ingredienteId.hashCode();
        result = 31 * result + nutrienteId.hashCode();
        return result;
    }
}
