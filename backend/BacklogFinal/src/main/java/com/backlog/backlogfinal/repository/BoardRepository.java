package com.backlog.backlogfinal.repository;

import com.backlog.backlogfinal.entity.BoardImpl;
import com.backlog.backlogfinal.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<BoardImpl, Integer> {

    //Consulta hql
    /*
    * SELECT b: la consulta devuelve objetos de la clase BoardImpl.
    FROM BoardImpl b: boards de la base de datos, que está representada por la
    * clase BoardImpl.
    WHERE b.usuario = :usuario: filtra las tablas de BoardImpl que tienen un campo usuario igual al usuario proporcionado.
    * */
    @Query("SELECT b FROM BoardImpl b WHERE b.usuario = :usuario")
    List<BoardImpl> findAllByUsuarioHql(@Param("usuario") Usuario usuario);

    void deleteByIdboards(int idboards);

    // es una clase que se utiliza para representar valores que pueden o no estar presente
    Optional<BoardImpl> findByIdboardsAndUsuario(int idboards, Usuario usuario);
}
