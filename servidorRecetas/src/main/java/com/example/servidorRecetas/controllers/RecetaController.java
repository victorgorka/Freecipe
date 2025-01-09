package com.example.servidorRecetas.controllers;

import com.example.servidorRecetas.services.RecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class RecetaController {

    @Autowired
    private RecetaService recipeService;

    @GetMapping("/data")
    public Mono<String> getRecipes() {
        return recipeService.getRecipes();
    }
}

//import com.example.servidorRecetas.model.Receta;
//import com.example.servidorRecetas.services.RecetaService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RestController;
//import reactor.core.publisher.Mono;
//
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//public class RecetaController {
//
//    private final RecetaService recetaService;
//
//    @GetMapping("/recipes/fetch")
//    public Mono<Void> fetchAndSaveRecipes() {
//        return recetaService.fetchRecipes()
//                .doOnSuccess(recipes -> recetaService.saveRecipes(recipes))
//                .then();
//    }
//
//    @GetMapping("/recipes/ingredient/{ingredient}")
//    public List<Receta> getRecipesByIngredient(@PathVariable String ingredient) {
//        return recetaService.searchRecipesByIngredient(ingredient);
//    }
//}