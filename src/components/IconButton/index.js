import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ICBack, ICLike, ICShare } from '../../asset';
import {colors} from '../../utils'

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
    width: 35,
    height: 35,
    borderRadius: 50 / 2,
    backgroundColor: colors.button.secondary,
    opacity: 0.8,
    justifyContent: 'center'
  },
  icon: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
});
