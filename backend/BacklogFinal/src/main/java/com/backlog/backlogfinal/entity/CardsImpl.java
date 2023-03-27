package com.backlog.backlogfinal.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cards")
public class CardsImpl {

    @Id
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idcards;

    private String titulocard;

    private String descriptioncard;

    @NotNull
    private String estados;

    @ManyToOne
    @JoinColumn(name = "boards_idboards", referencedColumnName = "idboards")
    private BoardImpl boardImpl;

}