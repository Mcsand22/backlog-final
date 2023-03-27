package com.backlog.backlogfinal.controller;

import com.backlog.backlogfinal.dto.UsuarioDTO;
import com.backlog.backlogfinal.entity.Usuario;
import com.backlog.backlogfinal.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/add")
    public UsuarioDTO agregarUsuario(@RequestBody UsuarioDTO usuarioDTO){
        return usuarioService.guardarUsuario(usuarioDTO);
    }

    @GetMapping("/all")
    public List<UsuarioDTO> obtenerTodosLosUsuarios(){
        return usuarioService.obtenerTodosLosUsuarios();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioRecibido = usuarioService.buscarUsuarioPorMailYContrasenia(usuario.getMail(),
                usuario.getContrasenia());
        if (usuarioRecibido.isPresent()) {
            return ResponseEntity.ok(usuarioRecibido.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }

    @PutMapping("/update/{idusuarios}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable  int idusuarios,
                                                     @RequestBody Usuario usuarioActualizado) throws ResourceNotFoundException {
        final Usuario usuarioActualizadoEnBD = usuarioService.actualizarUsuario(idusuarios, usuarioActualizado);
        return ResponseEntity.ok(usuarioActualizadoEnBD);
    }

    @GetMapping("/{idusuarios}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable int idusuarios) throws ResourceNotFoundException {
        Usuario usuario = usuarioService.findByIdusuarios(idusuarios)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id " + idusuarios));
        return ResponseEntity.ok(usuario);
    }

}