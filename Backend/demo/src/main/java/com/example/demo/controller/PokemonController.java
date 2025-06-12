package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PokemonDTO;
import com.example.demo.service.PokemonService;

@RestController
@RequestMapping("/pokemon")
@CrossOrigin(origins = "http://localhost:4200")
public class PokemonController {
    private final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping("/{name}")
    public PokemonDTO getPokemon(@PathVariable String name) throws Exception {
        return pokemonService.getPokemon(name);
    }
}
