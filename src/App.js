import { useEffect, useState } from "react";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import { shuffle } from "./utils/shuffle";
import './styles/App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then(res => res.json())
      .then(async data => {
        const cardData = await Promise.all(data.results.map(async pokemon => {
          const res = await fetch(pokemon.url);
          const info = await res.json();
          return {
            id: info.id,
            name: pokemon.name,
            image: info.sprites.front_default
          };
        }));
        setCards(shuffle(cardData));
      });
  }, []);

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      setCurrentScore(0);
      setClickedCards([]);
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setBestScore(Math.max(bestScore, newScore));
      setClickedCards([...clickedCards, id]);
      setCards(shuffle(cards));
    }
  };

  return (
    <div className="app">
      <h1>Pokémon Memory Game</h1>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <div className="card-container">
        {cards.map(card => (
          <Card
            key={card.id}
            image={card.image}
            title={card.name}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
