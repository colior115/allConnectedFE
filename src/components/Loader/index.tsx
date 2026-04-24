import { colors } from '../../styles/theme/colors';

interface LoaderProps {
  size?: number;
}

export default function Loader({ size = 32 }: LoaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `3px solid ${colors.border}`,
          borderTopColor: colors.primary,
          animation: 'spin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
