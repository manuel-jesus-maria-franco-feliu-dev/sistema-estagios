package br.edu.sistemaestagios.service;

import br.edu.sistemaestagios.model.Vaga;
import br.edu.sistemaestagios.repository.VagaRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class VagaService {

    private final VagaRepository vagaRepository;

    public VagaService(VagaRepository vagaRepository) {
        this.vagaRepository = vagaRepository;
    }

    public Vaga salvar(Vaga vaga) {

        if (vaga.getTitulo() == null || vaga.getTitulo().trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O título da vaga é obrigatório"
            );
        }

        if (vaga.getEmpresa() == null || vaga.getEmpresa().trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "A empresa é obrigatória"
            );
        }

        if (vaga.getCargaHoraria() == null || vaga.getCargaHoraria() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Carga horária inválida"
            );
        }

        vaga.setAtiva(true);

        return vagaRepository.save(vaga);
    }

    public List<Vaga> listarTodas() {
        return vagaRepository.findAll();
    }

    public Optional<Vaga> buscarPorId(Long id) {
        return vagaRepository.findById(id);
    }

    public void deletar(Long id) {
        vagaRepository.deleteById(id);
    }
}



