package com.backlog.backlogfinal.services;

import com.backlog.backlogfinal.datos.DatosDummy;
import com.backlog.backlogfinal.dto.UsuarioDTO;
import com.backlog.backlogfinal.entity.Usuario;
import com.backlog.backlogfinal.mapper.UsuarioMapper;
import com.backlog.backlogfinal.repository.UsuarioRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import com.backlog.backlogfinal.entity.Usuario;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class UsuarioServiceTest extends Usuario{

    //No tengo que volver a probar el repo, testing unitario
    @Mock
    private UsuarioRepository usuarioRepository;
    private UsuarioService usuarioService;

    @Mock
    private UsuarioMapper usuarioMapper;

    @BeforeEach
    void setUp(){
        //instan
        usuarioRepository = mock(UsuarioRepository.class);
        usuarioService = new UsuarioService(usuarioRepository, usuarioMapper);
    }

    @AfterEach
    void tearDown(){

    }
    @Test
    @DisplayName("[Service: UsuarioService] : Crear usuario")
    void guardarUsuario() {

        //GIVEN
        UsuarioDTO usuarioDTO = DatosDummy.getUsuarioAdminDto();
        Usuario usuario = usuarioMapper.toEntity(usuarioDTO);
        //WHEN
        usuarioService.guardarUsuario(usuarioMapper.toDTO(usuario));
        //THEN
        ArgumentCaptor<Usuario> usuarioArgumentCaptor =
                ArgumentCaptor.forClass(Usuario.class);

        verify(usuarioRepository).save(usuarioArgumentCaptor.capture());

        Usuario usuarioCaptor = usuarioArgumentCaptor.getValue();

        assertThat(usuarioCaptor).isEqualTo(usuario);


    }

    @Test
    @DisplayName("[Service: UsuarioService] : Obtener todos los usuarios")
    void obtenerTodosLosUsuarios() {

        //GIVEN
        when(this.usuarioRepository.findAll())
                .thenReturn(Arrays.asList(
                        DatosDummy.getUsuarioPrueba(),
                        DatosDummy.getUsuarioAdmin()
                ));
        //WHEN
        List<UsuarioDTO> listUsuarios = usuarioService.obtenerTodosLosUsuarios();

        //THEN
        assertThat(listUsuarios.size()).isEqualTo(2);
        assertThat(listUsuarios.isEmpty()).isFalse();

        verify(usuarioRepository).findAll();
    }

    @Test
    @DisplayName("[Service: UsuarioService] : Obtener usuario por mail y contraseña")
    void buscarUsuarioPorMailYContrasenia() {

        String mail = "admin@gmail.com";
        String contrasenia = "123456789";

        //GIVEN
        when(this.usuarioRepository.findByMailAndContrasenia(mail, contrasenia)
        ).thenReturn(Optional.of(
                DatosDummy.getUsuarioAdmin()
        ));

        //WHEN
        Optional<Usuario> usuarioEncontrado =
                this.usuarioService.buscarUsuarioPorMailYContrasenia(mail, contrasenia);
        //THEN
        assertThat(usuarioEncontrado.isPresent()).isTrue();
        assertThat(usuarioEncontrado.get().getMail()).isEqualTo(mail);
        assertThat(usuarioEncontrado.get().getContrasenia()).isEqualTo(contrasenia);
        verify(usuarioRepository).findByMailAndContrasenia(mail, contrasenia);
    }

    @Test
    @DisplayName("[Service: UsuarioService] : Actualizar usuario")
    void actualizarUsuario() {

        //GIVEN
        int idusuario = 1;
        Usuario usuarioActualizado = new Usuario(1, "NombreNuevo", "ApellidoNuevo", "admin@gmail.com",
                "123456789", "http://img");
        when(this.usuarioRepository.findByIdusuarios(idusuario)
        ).thenReturn(Optional.of(
                 DatosDummy.getUsuarioAdmin()
        ));
        //WHEN
        this.usuarioService.actualizarUsuario(idusuario, usuarioActualizado);

        //THEN
        ArgumentCaptor<Usuario> usuarioArgCaptor =
                ArgumentCaptor.forClass(Usuario.class);

        verify(usuarioRepository).save(usuarioArgCaptor.capture());
        verify(usuarioRepository).findByIdusuarios(idusuario);
    }

    @Test
    @DisplayName("[Service: UsuarioService] : Obtener usuario por id")
    void findByIdusuarios() {

        int idusuario = 1;

        //GIVEN
        when(this.usuarioRepository.findByIdusuarios(idusuario)
        ).thenReturn(Optional.of(
                        DatosDummy.getUsuarioAdmin()
                ));
        //WHEN
        Optional<Usuario> usuarioEncontrado =
                this.usuarioService.findByIdusuarios(idusuario);
        //THEN
        assertThat(usuarioEncontrado.isPresent()).isTrue();
        assertThat(usuarioEncontrado.get().getContrasenia()).isEqualTo("123456789");
        verify(usuarioRepository).findByIdusuarios(idusuario);
    }
}