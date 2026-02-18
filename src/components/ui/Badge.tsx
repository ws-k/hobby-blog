interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'gray';
}

const variants = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  gray: 'bg-gray-100 text-gray-600',
};

export default function Badge({ children, variant = 'gray' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
