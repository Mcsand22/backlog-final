package com.backlog.backlogfinal.repository;

import com.backlog.backlogfinal.entity.BoardImpl;
import com.backlog.backlogfinal.entity.CardsImpl;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardsRepository extends JpaRepository<CardsImpl, Integer> {
    List<CardsImpl> findByBoardImpl(BoardImpl boardImpl);

    Optional<CardsImpl> findByIdcardsAndBoardImpl(int idcards, BoardImpl boardImpl);
}
