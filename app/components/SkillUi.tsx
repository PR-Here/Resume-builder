import { View, Text, StyleSheet } from 'react-native';
import { FONT_SIZE, SPACING } from '../styles/responsive';


const SkillUi = ({ skill }: { skill: string }) => {
  return (
    <View style={styles.skillContainer}>
        <Text>.</Text>
      <Text style={styles.skillName}>{skill}</Text>
    </View>
  );
};

export default SkillUi;

const styles = StyleSheet.create({
  skillContainer: {
    padding: SPACING.sm,
    borderRadius: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillName: {
    fontSize: FONT_SIZE.h6,
    color: '#000',
  },
  dot: {
    fontSize: FONT_SIZE.h6,
    color: '#000',
    marginRight: SPACING.sm,
  },
}); 
