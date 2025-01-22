package com.example.servidorRecetas.controllers;

import com.example.servidorRecetas.model.Ingredient;
import com.example.servidorRecetas.services.CrudIngrediente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    private CrudIngrediente ingredientService;

    // Get all ingredients
    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    // Get ingredient by ID
    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Long id) {
        Optional<Ingredient> ingredient = ingredientService.getIngredientById(id);
        return ingredient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create new ingredient
    @PostMapping
    public Ingredient createIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.createIngredient(ingredient);
    }

    // Update existing ingredient
    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> updateIngredient(@PathVariable Long id, @RequestBody Ingredient ingredient) {
        Ingredient updatedIngredient = ingredientService.updateIngredient(id, ingredient);
        return updatedIngredient != null ? ResponseEntity.ok(updatedIngredient) : ResponseEntity.notFound().build();
    }

    // Delete ingredient by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Long id) {
        return ingredientService.deleteIngredient(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
