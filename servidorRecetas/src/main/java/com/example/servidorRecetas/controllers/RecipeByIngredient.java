package com.example.servidorRecetas.controllers;

import com.example.servidorRecetas.model.Recipe;
import com.example.servidorRecetas.repository.RecipeRepository;
import com.example.servidorRecetas.services.CrudReceta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
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
    public List<Recipe> findRecipesByIngredients(@RequestParam List<String> ingredients) {


        // The number of ingredients in the list
        long ingredientsCount = ingredients.size();

        // Call the repository method
        return recipeRepository.findRecipesByIngredients(ingredients, ingredientsCount);
    }

}