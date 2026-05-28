package br.edu.sistemaestagios.controller;

import br.edu.sistemaestagios.model.Vaga;
import br.edu.sistemaestagios.service.VagaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vagas")
public class VagaController {

    private final VagaService vagaService;

    public VagaController(
            VagaService vagaService
    ) {

        this.vagaService = vagaService;

    }

    // CRIAR
    @PostMapping
    public Vaga criarVaga(
            @RequestBody Vaga vaga
    ) {

        return vagaService.salvar(vaga);

    }

    // LISTAR
    @GetMapping
    public List<Vaga> listarTodas() {

        return vagaService.listarTodas();

    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Optional<Vaga> buscarPorId(
            @PathVariable Long id
    ) {

        return vagaService.buscarPorId(id);

    }

    // EDITAR
    @PutMapping("/{id}")
    public Vaga atualizar(
            @PathVariable Long id,
            @RequestBody Vaga vaga
    ) {

        return vagaService.atualizar(id, vaga);

    }

    // EXCLUIR
    @DeleteMapping("/{id}")
    public void deletar(
            @PathVariable Long id
    ) {

        vagaService.deletar(id);

    }

}