export default function Button({ children, onClick, variant = 'primary', className = '', disabled = false }) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-300 transform active:scale-95';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md',
    success: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-md',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
