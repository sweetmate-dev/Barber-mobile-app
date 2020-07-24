import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Header, Left, Body, Right, Icon} from 'native-base';
import {Colors} from '../../themes';
import {H4, H5} from '../styled/Text';
import {BarView} from '../styled/View';
import {BarButton} from '../styled/Button';
import NavigationService from '../../navigation/NavigationService';
import {dySize} from '../../utils/responsive';

const HeaderWrapper = styled(Header)`
  width: ${dySize(375)};
  height: auto;
  background-color: transparent;
  border-bottom-width: 0px;
  elevation: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderLeft = styled(Left)`
  max-width: ${dySize(60)}px;
  min-width: ${dySize(60)}px;
  justify-content: center;
  align-items: flex-start;
`;

const HeaderRight = styled(Right)`
  max-width: ${dySize(60)}px;
  min-width: ${dySize(60)}px;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderBody = styled(Body)`
  max-width: ${dySize(235)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StatusBarStyles = {
  Bright: 'dark-content',
  Dark: 'light-content',
};

const BarHeader = ({
  title,
  hasBack = true,
  hasLeftBadge = false,
  hasRight = false,
  headerIcon,
  rightText = '',
  rightIcon = '',
  leftIcon = 'ios-arrow-back',
  leftIconSize = 20,
  rightImage,
  rightIconType = 'Ionicons',
  rightIconSize = 20,
  rightIconColor,
  leftIconType = 'Ionicons',
  onPressRight = () => undefined,
  onPressBack = () => NavigationService.goBack(),
  style = {},
}) => {
  return (
    <HeaderWrapper style={style}>
      <HeaderLeft>
        {hasBack && (
          <BarButton onPress={() => onPressBack()}>
            <Icon
              type={leftIconType}
              name={leftIcon}
              style={{fontSize: leftIconSize, color: Colors.outline}}
            />
            {hasLeftBadge && (
              <BarView
                style={{
                  position: 'absolute',
                  top: dySize(5),
                  left: dySize(20),
                }}
                width={12}
                height={12}
                bordered
                br={6}
                background={Colors.red}
              />
            )}
          </BarButton>
        )}
      </HeaderLeft>
      <HeaderBody>
        {title}
        {headerIcon}
      </HeaderBody>
      <HeaderRight>
        <BarButton align="center" onPress={() => onPressRight()}>
          {hasRight && rightIcon.length > 0 && (
            <Icon
              type={rightIconType}
              name={rightIcon}
              style={{fontSize: rightIconSize, color: Colors.outline}}
            />
          )}
          {hasRight && rightImage && rightImage}
          {hasRight && rightIcon.length > 0 && rightText.length > 0 && (
            <H5 align="center" pv={1}>
              {rightText}
            </H5>
          )}
          {hasRight && rightIcon.length === 0 && rightText.length > 0 && (
            <H4 align="center" pv={1}>
              {rightText}
            </H4>
          )}
        </BarButton>
      </HeaderRight>
    </HeaderWrapper>
  );
};

BarHeader.propTypes = {
  hasBack: PropTypes.bool,
  hasLeftBadge: PropTypes.bool,
  title: PropTypes.node,
  hasRight: PropTypes.bool,
  headerIcon: PropTypes.node,
  rightText: PropTypes.string,
  rightIcon: PropTypes.string,
  rightImage: PropTypes.node,
  rightIconType: PropTypes.string,
  rightIconSize: PropTypes.number,
  rightIconColor: PropTypes.string,
  leftIcon: PropTypes.string,
  leftIconSize: PropTypes.number,
  leftIconType: PropTypes.string,
  onPressRight: PropTypes.func,
  style: PropTypes.object,
  onPressBack: PropTypes.func,
};

export default BarHeader;
