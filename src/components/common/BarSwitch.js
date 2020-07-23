import React from 'react';
import {Switch} from 'react-native-switch';
import {Colors} from '../../themes';

const BarSwitch = ({
  value,
  activeText = 'On',
  inActiveText = 'Off',
  ...props
}) => {
  return (
    <Switch
      value={value}
      activeText={activeText}
      inActiveText={inActiveText}
      circleSize={26}
      barHeight={30}
      circleBorderWidth={0}
      changeValueImmediately={false}
      backgroundActive={Colors.success}
      backgroundInactive={Colors.gray}
      circleActiveColor={Colors.text}
      circleInActiveColor={Colors.text}
      outerCircleStyle={{alignItems: 'center', justifyContent: 'center'}}
      switchLeftPx={10} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={10} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={2.4} // multipled by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={30}
      {...props}
    />
  );
};

export default BarSwitch;
