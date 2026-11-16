import { useState } from 'react';

type TeaCardProps = {
  name: string;
  origin: string;
  notes: string;
};

export function TeaCard({ name, origin, notes }: TeaCardProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article>
      <h2>{name}</h2>
      <p>{origin}</p>
      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Скрыть' : 'Подробнее'}</button>

      {expanded && <p>{notes}</p>}
    </article>
  );
}
