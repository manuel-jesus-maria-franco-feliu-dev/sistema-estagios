package br.edu.sistemaestagios.sistemaestagios.controller;

import br.edu.sistemaestagios.model.Usuario;
import br.edu.sistemaestagios.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;
    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    //CRIAR ARQUIVO DE USUARIOS

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        usuario.setAtivo(true);
        return usuarioRepository.save(usuario);
    }
    //LISTAR TODOS OS USUARIOS
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }
}
