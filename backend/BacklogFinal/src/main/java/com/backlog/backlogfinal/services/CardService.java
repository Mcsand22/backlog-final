package com.backlog.backlogfinal.services;

import com.backlog.backlogfinal.controller.ResourceNotFoundException;
import com.backlog.backlogfinal.entity.BoardImpl;
import com.backlog.backlogfinal.entity.CardsImpl;
import com.backlog.backlogfinal.entity.Usuario;
import com.backlog.backlogfinal.repository.BoardRepository;
import com.backlog.backlogfinal.repository.CardsRepository;
import com.backlog.backlogfinal.services.interfaces.CardServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CardService implements CardServiceInterface {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private CardsRepository cardsRepository;

    Usuario usuario;

    public List<CardsImpl> getCardsByBoardId(int idboards) {
        Optional<BoardImpl> board = boardRepository.findById(idboards);
        if (board.isPresent()) {
            return cardsRepository.findByBoardImpl(board.get());
        } else {
            try {
                throw new ResourceNotFoundException("Board no encontrado");
            } catch (ResourceNotFoundException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public CardsImpl createCard(int idboards, CardsImpl newCard) {
        Optional<BoardImpl> board = boardRepository.findById(idboards);
        if (board.isPresent()) {
            newCard.setBoardImpl(board.get());
            return cardsRepository.save(newCard);
        } else {
            try {
                throw new ResourceNotFoundException("Board no encontrado");
            } catch (ResourceNotFoundException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public CardsImpl updateCard(int idboards, int idcards, CardsImpl updatedCard) {
        Optional<BoardImpl> board = boardRepository.findById(idboards);
        if (board.isPresent()) {
            Optional<CardsImpl> card = cardsRepository.findById(idcards);
            if (card.isPresent() && card.get().getBoardImpl().equals(board.get())) {
                updatedCard.setIdcards(idcards);
                updatedCard.setBoardImpl(board.get());
                return cardsRepository.save(updatedCard);
            } else {
                try {
                    throw new ResourceNotFoundException("Card no encontrada");
                } catch (ResourceNotFoundException e) {
                    throw new RuntimeException(e);
                }
            }
        } else {
            try {
                throw new ResourceNotFoundException("Board no encontrado");
            } catch (ResourceNotFoundException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Transactional
    public void deleteCard(int idboards, int idcards) {
        Optional<BoardImpl> board = boardRepository.findById(idboards);
        if (board.isPresent()) {
            Optional<CardsImpl> card = cardsRepository.findByIdcardsAndBoardImpl(idcards, board.get());
            if (card.isPresent()) {
                cardsRepository.delete(card.get());
            } else {
                try {
                    throw new ResourceNotFoundException("Card no encontrada");
                } catch (ResourceNotFoundException e) {
                    throw new RuntimeException(e);
                }
            }
        } else {
            try {
                throw new ResourceNotFoundException("Board no encontrado");
            } catch (ResourceNotFoundException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public CardsImpl getCardById(int idboards, int idcards) {
        Optional<CardsImpl> card = cardsRepository.findById(idcards);
        if (card.isPresent() && card.get().getBoardImpl().getIdboards() == idboards) {
            return card.get();
        } else {
            throw new ResourceNotFoundException("Card no encontrada en board id :: " + idboards +
                    " y card id :: " + idcards);
        }
    }

}