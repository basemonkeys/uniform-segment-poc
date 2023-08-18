import classNames from 'classnames';

interface ButtonProps {
  className?;
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;

  type?: 'default' | 'info' | 'link' | 'warning';
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'base' | 'lg' | 'xl';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const Button = ({
  className,
  primary = false,
  type = 'default',
  size = 'base',
  label,
  ...props
}: ButtonProps) => {  

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': {
        return 'py-2.5 px-4 text-sm';
      }
      case 'lg': {
        return 'py-3.5 px-6 text-lg';
      }
      case 'xl': {
        return 'py-4 px-7 text-xl';
      }
      default: {
        return 'py-3 px-5 text-base';
      }
    }
  }

  const getButtonType = () => {
    switch (type) {
      case 'info': {
        return 'text-blue-600 bg-blue-500 border-blue-500';
      }
      case 'link': {
        return 'text-slate-500 border-none';
      }
      case 'warning': {
        return 'text-red-600 bg-red-600 border-red-600';
      }
      default: {
        return 'text-slate-500 bg-slate-400 border-slate-400';
      }
    }
  }

  const buttonSize = getSizeClasses();
  const buttonType = getButtonType();

  const button = 'rounded cursor-pointer font-bold inline-block border-3'
  const mode = primary ? `${buttonType} !text-white` : `${buttonType} !bg-transparent`;

  return (
    <button
      type="button"
      className={classNames(button, mode, buttonSize, className)}
      {...props}
    >
      {label}
    </button>
  );
};
