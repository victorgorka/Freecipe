package com.example.servidorRecetas.model;
import jakarta.persistence.*;

@Entity
@IdClass(IngredienteNutrienteId.class)
public class IngredienteNutriente {

    @Id
    private Long ingredienteId;
    
    @Id
    private Long nutrienteId;
    
    private Integer amount;

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

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
