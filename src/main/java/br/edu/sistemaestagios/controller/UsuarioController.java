package br.edu.sistemaestagios.controller;

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

    // CRIAR USUÁRIO (POST)
    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        // VALIDAÇÕES DE USUARIO E SENHA
        if (usuario.getSenha() == null || usuario.getSenha().length() < 8) {
            throw new RuntimeException("Senha deve ter no mínimo 8 caracteres");
        }

        if (usuario.getEmail() == null || !usuario.getEmail().contains("@")) {
            throw new RuntimeException("Email inválido");
        }

        usuario.setAtivo(true);
        return usuarioRepository.save(usuario);
    }

    // LISTAR TODOS OS USUARIOS (GET)
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // BUSCAR USUARIOS (GET)
    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    // DELETAR USUARIOS (DELETE)
    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }

    // ATUALIZAR USUARIOS (PUT)
    @PutMapping("/{id}")
    public Usuario atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        return usuarioRepository.save(usuario);
    }
}
