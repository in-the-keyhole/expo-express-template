import React from 'react';

import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles';
import { ThemedText } from '@/components/ThemedText';

const HomeScreen = () => {
  return (
    <ThemedView style={[styles.jrow, styles.flex1, styles.containerCenter]}>
      <ThemedText>
        Your app goes here
      </ThemedText>
    </ThemedView>
  );
};

export default HomeScreen;
