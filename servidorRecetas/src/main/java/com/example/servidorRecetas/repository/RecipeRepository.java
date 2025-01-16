package com.example.servidorRecetas.repository;

import com.example.servidorRecetas.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query(value = "SELECT r.* " +
            "FROM recipe r " +
            "JOIN recipe_ingredient ri ON r.id = ri.recipe_id " +
            "JOIN ingredient i ON ri.ingredient_id = i.id " +
            "WHERE i.name IN :ingredients " +
            "AND r.id NOT IN (" +
            "    SELECT r2.id " +
            "    FROM recipe r2 " +
            "    JOIN recipe_ingredient ri2 ON r2.id = ri2.recipe_id " +
            "    JOIN ingredient i2 ON ri2.ingredient_id = i2.id " +
            "    WHERE i2.name NOT IN :ingredients" +
            ") " +
            "GROUP BY r.id " +
            "HAVING COUNT(DISTINCT i.name) <= :ingredientsCount",
            nativeQuery = true)
    List<Recipe> findRecipesByIngredients(@Param("ingredients") List<String> ingredients,
                                          @Param("ingredientsCount") long ingredientsCount);
}