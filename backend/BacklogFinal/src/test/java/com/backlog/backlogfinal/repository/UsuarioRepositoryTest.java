package com.backlog.backlogfinal.repository;

import com.backlog.backlogfinal.datos.DatosDummy;
import com.backlog.backlogfinal.entity.Usuario;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    @DisplayName("[Repository: UsuarioRepository] : Buscar por mail y contraseña")
    void findByMailAndContrasenia() {


        //GIVEN
        this.usuarioRepository.save(DatosDummy.getUsuarioAdmin());
        this.usuarioRepository.save(DatosDummy.getUsuarioPrueba());

        //WHEN
        Optional<Usuario> primerUsuario = this.usuarioRepository.findByMailAndContrasenia("admin@gmail.com", "123456789");
        Optional<Usuario> segundoUsuario = this.usuarioRepository.findByMailAndContrasenia(
                "prueba@gmail.com", "prueba");

        //THEN
        assertThat(primerUsuario.isPresent()).isTrue();
        assertThat(primerUsuario.get().getMail()).isEqualTo("admin@gmail.com");
        assertThat(primerUsuario.get().getContrasenia()).isEqualTo("123456789");
        assertThat(segundoUsuario.isPresent()).isTrue();
        assertThat(segundoUsuario.get().getMail()).isEqualTo("prueba@gmail.com");
        assertThat(segundoUsuario.get().getContrasenia()).isEqualTo("prueba");
    }

    @Test
    @DisplayName("[Repository: UsuarioRepository] : Buscar por id de usuarios")
    void findByIdusuarios() {

        //GIVEN
        this.usuarioRepository.save(DatosDummy.getUsuarioAdmin());
        this.usuarioRepository.save(DatosDummy.getUsuarioPrueba());

        //WHEN
        Optional<Usuario> primerUsuario = this.usuarioRepository.findByIdusuarios(1);
        Optional<Usuario> segundoUsuario = this.usuarioRepository.findByIdusuarios(2);

        //THEN
        assertThat(primerUsuario.isPresent()).isTrue();
        assertThat(primerUsuario.get().getIdusuarios()).isEqualTo(1);
        assertThat(segundoUsuario.isPresent()).isTrue();
        assertThat(segundoUsuario.get().getIdusuarios()).isEqualTo(2);
    }
}