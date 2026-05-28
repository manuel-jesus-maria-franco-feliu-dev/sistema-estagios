package br.edu.sistemaestagios.service;

import br.edu.sistemaestagios.model.Vaga;
import br.edu.sistemaestagios.model.enums.StatusVaga;
import br.edu.sistemaestagios.repository.VagaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VagaService {

    private final VagaRepository vagaRepository;

    public VagaService(
            VagaRepository vagaRepository
    ) {

        this.vagaRepository = vagaRepository;

    }

    // SALVAR
    public Vaga salvar(Vaga vaga) {

        if(vaga.getTitulo() == null ||
                vaga.getTitulo().trim().isEmpty()) {

            throw new RuntimeException(
                    "Título obrigatório"
            );

        }

        if(vaga.getCargaHoraria() <= 0) {

            throw new RuntimeException(
                    "Carga horária inválida"
            );

        }

        if(vaga.getStatus() == null) {

            vaga.setStatus(
                    StatusVaga.ABERTA
            );

        }

        return vagaRepository.save(vaga);

    }

    // LISTAR TODAS
    public List<Vaga> listarTodas() {

        return vagaRepository.findAll();

    }

    // BUSCAR POR ID
    public Optional<Vaga> buscarPorId(Long id) {

        return vagaRepository.findById(id);

    }

    // DELETAR
    public void deletar(Long id) {

        vagaRepository.deleteById(id);

    }

    // ATUALIZAR
    public Vaga atualizar(Long id, Vaga vaga) {

        vaga.setId(id);

        return vagaRepository.save(vaga);

    }

}