package com.example.servidorRecetas.services;

import com.example.servidorRecetas.model.Ingredient;
import com.example.servidorRecetas.model.Recipe;
import com.example.servidorRecetas.repository.IngredientRepository;
import com.example.servidorRecetas.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class CrudReceta {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Transactional
    public Recipe createRecipe(Recipe recipe, MultipartFile file) {
        // Process ingredients
        for (int i = 0; i < recipe.getIngredients().size(); i++) {
            Ingredient ingredient = recipe.getIngredients().get(i);

            // Check if the ingredient already exists in the database by its name
            Optional<Ingredient> existingIngredient = ingredientRepository.findByName(ingredient.getName());

            if (existingIngredient.isPresent()) {
                // If the ingredient exists, use the existing entity to avoid creating a new one
                recipe.getIngredients().set(i, existingIngredient.get());
            } else {
                // If the ingredient doesn't exist, save it to the database
                ingredientRepository.save(ingredient);
            }
        }

        // Handle image upload
        if (file != null && !file.isEmpty()) {
            // Normalize the file name to prevent security issues
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            try {
                // Ensure the upload directory exists, create it if it doesn't
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Define the path where the file will be saved
                Path path = uploadPath.resolve(fileName);
                Files.copy(file.getInputStream(), path);

                // Generate the URL to access the image
                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/uploads/")
                        .path(fileName)
                        .toUriString();

                // Set the image URL in the recipe
                recipe.setImage(fileDownloadUri);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image", e);
            }
        }

        // Save the recipe in the database
        return recipeRepository.save(recipe);
    }


    public Recipe updateRecipe(int id, Recipe updatedRecipe) {
        if (recipeRepository.existsById((long) id)) {
            updatedRecipe.setId(id);  // Ensure the ID is set for the existing record
            return recipeRepository.save(updatedRecipe);
        }
        return null; // or throw exception
    }

    public boolean deleteRecipe(Long id) {
        if (recipeRepository.existsById(id)) {
            recipeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}