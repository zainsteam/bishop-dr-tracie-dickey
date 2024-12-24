import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: `bold`,
    color: `#2a0637`,
    textAlign: `left`,
    textTransform: 'capitalize',
  },
});

interface HeadingProps {
  heading: string;
}
const Heading: React.FC<HeadingProps> = ({heading}) => {
  return <Text style={styles.heading}>{heading}</Text>;
};

export default Heading;
