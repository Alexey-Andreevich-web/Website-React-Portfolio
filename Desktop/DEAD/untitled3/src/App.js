// Импортируем хук useState из React для работы с состоянием
import { useState } from 'react';

// Компонент Square: отображает одну ячейку (кнопку) на игровом поле
function Square({ value, onSquareClick }) {
    return (
        // Кнопка, которая отображает значение ячейки и вызывает onSquareClick при клике
        <button className="square" onClick={onSquareClick}>
            {value} {/* Отображаем значение ячейки (например, 'X' или 'O') */}
        </button>
    );
}

// Компонент Board: отображает игровое поле и управляет ходами игроков
function Board({ xIsNext, squares, onPlay }) {
    // Функция обработки кликов по ячейкам
    function handleClick(i) {
        // Если есть победитель или ячейка уже занята, ничего не делаем
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // Копируем массив squares, чтобы не мутировать исходное состояние
        const nextSquares = squares.slice();

        // Вставляем 'X' или 'O' в зависимости от того, чей ход
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }

        // Передаем обновленный массив на родительский компонент для дальнейшего обновления состояния
        onPlay(nextSquares);
    }

    // Вычисляем победителя на основе текущего состояния поля
    const winner = calculateWinner(squares);

    // Определяем статус игры в зависимости от наличия победителя
    let status;
    if (winner) {
        status = 'Winner: ' + winner;  // Если победитель найден, выводим его имя
    } else {
        // Если победителя нет, выводим, чей следующий ход
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            {/* Отображаем текущий статус игры (победитель или чей следующий ход) */}
            <div className="status">{status}</div>
            {/* Три строки игрового поля */}
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}

// Главный компонент игры
export default function Game() {
    // Состояние для истории ходов и текущего хода
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    // Вычисляем, чей сейчас ход: 'X' или 'O'
    const xIsNext = currentMove % 2 === 0;

    // Текущее состояние игрового поля (в данный момент)
    const currentSquares = history[currentMove];

    // Функция обработки хода
    function handlePlay(nextSquares) {
        // Обновляем историю ходов, добавляя новый ход в конец
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        // Обновляем состояние истории и текущего хода
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    // Функция для перемещения к предыдущему ходу
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    // Генерируем список всех ходов (с возможностью перейти к каждому ходу)
    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;  // Описание для всех ходов, начиная с 1
        } else {
            description = 'Go to game start';  // Описание для начального состояния игры
        }
        return (
            <li key={move}>
                {/* Кнопка для перехода к выбранному ходу */}
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                {/* Рендерим компонент Board, передавая в него состояние игры */}
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                {/* Список всех ходов игры с возможностью вернуться к каждому */}
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

// Функция для вычисления победителя
function calculateWinner(squares) {
    // Возможные выигрышные комбинации
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Проверяем каждую комбинацию
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // Если все три клетки одной из выигрышных линий заняты одним и тем же игроком (не null), то это победа
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];  // Возвращаем символ победителя ('X' или 'O')
        }
    }
    return null;  // Если победителя нет, возвращаем null
}
