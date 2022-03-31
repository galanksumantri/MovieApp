import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ICBack, ICLike, ICShare } from '../../asset';

function IconButton({ type, onPress }) {
  function Icon() {
    if (type === 'Back') return <ICBack />;
    if (type === 'Like') return <ICLike />;
    if (type === 'Share') return <ICShare />;

    return <ICBack />;
  }

  return (
    <TouchableOpacity style={styles.iconWrapper} onPress={onPress}>
      <View style={styles.icon}>
        <Icon />
      </View>
    </TouchableOpacity>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'red',
    opacity: 0.8,
  },
  icon: {
    padding: 16,
    alignSelf: 'center',
    borderRadius: 8,
  },
});
