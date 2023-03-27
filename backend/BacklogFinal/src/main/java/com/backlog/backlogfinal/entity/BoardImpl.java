package com.backlog.backlogfinal.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name= "boards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardImpl {

    @Id
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idboards;
    String tituloboard;

    String img = "https://drive.google.com/uc?export=view&id=1GgUJ_3siOm01MonzQSzzpUkUnFslPhaE";
    @ManyToOne
    @JoinColumn(name = "id_usuarios", referencedColumnName = "idusuarios")
    Usuario usuario;

}