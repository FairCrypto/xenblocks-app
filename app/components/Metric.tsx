export interface MetricProps {
  title: string;
  value: string;
  desc?: string;
}

export function Metric(props: MetricProps) {
  return (
    <div className="outline outline-secondary col-span-1">
      <div className="stat p-3">
        <div className="stat-title text-accent text-xs md:text-sm mb-3">
          {props.title}
        </div>
        <div className="stat-value text-accent text-lg md:text-xl">
          {props.value}
        </div>
        {props.desc ? (
          <div className="stat-desc md:text-xs mt-2">{props.desc}</div>
        ) : null}
      </div>
    </div>
  );
}
