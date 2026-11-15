type Props = { checked: boolean; onChange: (valor: boolean) => void; rotulo: string };

export function Switch({ checked, onChange, rotulo }: Props) {
  return (
    <span className="switch">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        aria-label={rotulo}
        onChange={(evento) => onChange(evento.target.checked)}
      />
      <span className="slider" aria-hidden="true" />
    </span>
  );
}
