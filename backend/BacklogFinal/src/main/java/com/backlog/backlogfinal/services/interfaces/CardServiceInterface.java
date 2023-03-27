package com.backlog.backlogfinal.services.interfaces;

import com.backlog.backlogfinal.entity.CardsImpl;

import java.util.List;

public interface CardServiceInterface{
    List<CardsImpl> getCardsByBoardId(int idboards);
    CardsImpl createCard(int idboards, CardsImpl newCard);
    CardsImpl updateCard(int idboards, int idcards, CardsImpl updatedCard);
    void deleteCard(int idboards, int idcards);

    CardsImpl getCardById(int idboards, int idcards);
}
