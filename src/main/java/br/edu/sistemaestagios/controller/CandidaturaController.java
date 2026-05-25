package br.edu.sistemaestagios.controller;

import br.edu.sistemaestagios.model.Candidatura;
import br.edu.sistemaestagios.service.CandidaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/candidaturas")
@CrossOrigin(origins = "*")
public class CandidaturaController {

    @Autowired
    private CandidaturaService candidaturaService;

    // CANDIDATAR-SE A UM ESTÁGIO
    @PostMapping
    public ResponseEntity<?> candidatar(@RequestBody Map<String, Object> dados) {
        try {
            Long alunoId = Long.valueOf(dados.get("alunoId").toString());
            Long estagioId = Long.valueOf(dados.get("estagioId").toString());
            String observacao = (String) dados.getOrDefault("observacao", "");

            Candidatura nova = candidaturaService.candidatar(alunoId, estagioId, observacao);
            return ResponseEntity.status(HttpStatus.CREATED).body(nova);
        } catch (RuntimeException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }
    }

    // LISTAR TODAS
    @GetMapping
    public ResponseEntity<List<Candidatura>> listar() {
        return ResponseEntity.ok(candidaturaService.listarTodas());
    }

    // LISTAR POR ALUNO
    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<Candidatura>> listarPorAluno(@PathVariable Long alunoId) {
        return ResponseEntity.ok(candidaturaService.listarPorAluno(alunoId));
    }

    // LISTAR POR ESTÁGIO
    @GetMapping("/estagio/{estagioId}")
    public ResponseEntity<List<Candidatura>> listarPorEstagio(@PathVariable Long estagioId) {
        return ResponseEntity.ok(candidaturaService.listarPorEstagio(estagioId));
    }

    // ATUALIZAR STATUS (APROVAR/REPROVAR)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> dados) {
        try {
            String status = dados.get("status");
            Candidatura atualizada = candidaturaService.atualizarStatus(id, status);
            return ResponseEntity.ok(atualizada);
        } catch (RuntimeException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }
    }

    // DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            candidaturaService.deletar(id);
            Map<String, String> resposta = new HashMap<>();
            resposta.put("mensagem", "Candidatura removida!");
            return ResponseEntity.ok(resposta);
        } catch (Exception e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }
    }
}