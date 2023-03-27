package com.backlog.backlogfinal.repository;

import com.backlog.backlogfinal.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository <Usuario, String>{

    Optional<Usuario> findByMailAndContrasenia(String mail, String contrasenia);

    Optional<Usuario> findByIdusuarios(int idusuarios);
}
