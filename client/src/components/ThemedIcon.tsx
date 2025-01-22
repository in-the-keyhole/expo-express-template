import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesomeIcon, Props } from '@fortawesome/react-native-fontawesome';

export type ThemedIconProps = Props & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedIcon = ({
  lightColor,
  darkColor,
  ...rest
}: ThemedIconProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  return (
    <FontAwesomeIcon
      color={color}
      {...rest}
    />
  );
}
