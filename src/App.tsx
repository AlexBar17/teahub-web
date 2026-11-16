import { useEffect, useState } from 'react';
import { TeaCard } from './components/TeaCard';
import './App.css';

type Tea = {
  id: string;
  name: string;
  originCountry: string;
  originRegion: string;
  notes: string;
};

type TeaPage = {
  content: Tea[];
};

function App() {
  const [teas, setTeas] = useState<Tea[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeas() {
      try {
        const response = await fetch('/api/v1/teas', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: TeaPage = await response.json();

        setTeas(data.content);
        setError(null);
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error instanceof Error ? error.message : 'Ошибка загрузки');
        }
      }
    }

    void loadTeas();

    return () => controller.abort();
  }, [refresh]);

  return (
    <main>
      <h1>Чайная коллекция TeaHub</h1>

      <button onClick={() => setRefresh(value => value + 1)}>Обновить</button>

      {error && <p role="alert">{error}</p>}

      {teas.map(tea => (
        <TeaCard key={tea.id} name={tea.name} origin={`${tea.originCountry}, ${tea.originRegion}`} notes={tea.notes} />
      ))}
    </main>
  );
}

export default App;
