package com.example.servidorRecetas.controllers;

import com.example.servidorRecetas.model.Recipe;
import com.example.servidorRecetas.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeByIngredient {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("/byIngredients")
    public List<Recipe> findRecipesByIngredients(@RequestParam List<String> ingredients) {
        // The number of ingredients in the list
        long ingredientsCount = ingredients.size();

        // Call the repository method
        return recipeRepository.findRecipesByIngredients(ingredients, ingredientsCount);
    }

}