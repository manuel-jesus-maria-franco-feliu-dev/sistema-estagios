package br.edu.sistemaestagios.service;

import br.edu.sistemaestagios.model.Candidatura;
import br.edu.sistemaestagios.model.Aluno;
import br.edu.sistemaestagios.model.Estagio;
import br.edu.sistemaestagios.repository.CandidaturaRepository;
import br.edu.sistemaestagios.repository.AlunoRepository;
import br.edu.sistemaestagios.repository.EstagioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.sistemaestagios.repository.UsuarioRepository;
import br.edu.sistemaestagios.model.Usuario;

import java.time.LocalDate;
import java.util.List;

@Service
public class CandidaturaService {

    @Autowired
    private CandidaturaRepository candidaturaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EstagioRepository estagioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Criar candidatura
    public Candidatura candidatar(Long alunoId, Long estagioId, String observacao) {
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado!"));

        Estagio estagio = estagioRepository.findById(estagioId)
                .orElseThrow(() -> new RuntimeException("Estágio não encontrado!"));

        // Verificar se já existe candidatura
        List<Candidatura> existentes = candidaturaRepository.findByAlunoId(alunoId);
        boolean jaCandidatou = existentes.stream()
                .anyMatch(c -> c.getEstagio().getId().equals(estagioId));

        if (jaCandidatou) {
            throw new RuntimeException("Aluno já candidatou-se a este estágio!");
        }

        Candidatura candidatura = new Candidatura();
        candidatura.setAluno(aluno);
        candidatura.setEstagio(estagio);
        candidatura.setDataCandidatura(LocalDate.now());
        candidatura.setStatus("PENDENTE");
        candidatura.setObservacao(observacao);

        return candidaturaRepository.save(candidatura);
    }

    // Listar todas
    public List<Candidatura> listarTodas() {
        return candidaturaRepository.findAll();
    }

    // Listar por aluno
    public List<Candidatura> listarPorAluno(Long alunoId) {
        return candidaturaRepository.findByAlunoId(alunoId);
    }

    // Listar por estágio
    public List<Candidatura> listarPorEstagio(Long estagioId) {
        return candidaturaRepository.findByEstagioId(estagioId);
    }

    // Atualizar status (aprovar/reprovar)
    public Candidatura atualizarStatus(Long id, String status) {
        Candidatura candidatura = candidaturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidatura não encontrada!"));

        candidatura.setStatus(status);
        return candidaturaRepository.save(candidatura);
    }

    // Deletar
    public void deletar(Long id) {
        candidaturaRepository.deleteById(id);
    }
}