package com.example.servidorRecetas.controllers;

import com.example.servidorRecetas.model.Recipe;
import com.example.servidorRecetas.repository.RecipeRepository;
import com.example.servidorRecetas.services.CrudReceta;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipes")
public class RecipeByIngredient {

    @Autowired
    private CrudReceta recipeService;

    @Autowired
    private RecipeRepository recipeRepository;

    //############################## CRUD #####################################################
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeService.getRecipeById(id);
        return recipe.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create new recipe
    @PostMapping
    public Recipe createRecipe(@RequestParam("recipe") String recipeJson, @RequestParam("file") MultipartFile file) {
        // Deserialize the JSON string into a Recipe object
        ObjectMapper objectMapper = new ObjectMapper();
        Recipe recipe;
        try {
            recipe = objectMapper.readValue(recipeJson, Recipe.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse recipe JSON", e);
        }

        // Pass the recipe and file to the service layer
        return recipeService.createRecipe(recipe, file);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable int id, @RequestBody Recipe recipe) {
        Recipe updatedRecipe = recipeService.updateRecipe(id, recipe);
        return updatedRecipe != null ? ResponseEntity.ok(updatedRecipe) : ResponseEntity.notFound().build();
    }

    // Delete recipe by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        return recipeService.deleteRecipe(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    //############################## BUSQUEDA ##############################################

    @GetMapping("/byIngredients")
    public List<Recipe> getRecipesByIngredients(@RequestParam List<String> ingredients,@RequestParam boolean flexible) {
        long ingredientsCount = ingredients.size();
        if (flexible) {
            return recipeRepository.findRecipesByIngredientsFlexible(ingredients, ingredientsCount);
        } else {
            return recipeRepository.findRecipesByIngredients(ingredients, ingredientsCount);
        }
    }

}