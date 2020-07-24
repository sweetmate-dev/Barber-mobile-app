import styled from 'styled-components';
import {Icon} from 'native-base';
import {dySize} from '../../utils/responsive';
import {Colors, FontSize} from '../../themes';

export const BarText = styled.Text`
  color: ${(props) => props.color || Colors.text};
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
  padding-horizontal: ${(props) => dySize(props.ph || 0)}px;
  padding-vertical: ${(props) => dySize(props.pv || 5)}px;
  text-decoration: ${(props) => props.underline && 'underline'};
  text-decoration-color: ${(props) => props.color || Colors.text};
  background-color: ${(props) => props.bgColor || 'transparent'};
  margin-bottom: ${(props) => dySize(props.mb || 0)}px;
  margin-top: ${(props) => dySize(props.mt || 0)}px;
  margin-right: ${(props) => dySize(props.mr || 0)}px;
  margin-left: ${(props) => dySize(props.ml || 0)}px;
  width: ${(props) => (props.width ? `${dySize(props.width)}px` : 'auto')};
`;

export const BarIcon = styled(Icon)`
  font-size: ${(props) => dySize(props.size || 20)}px;
  color: ${(props) => props.color || Colors.text};
  margin: ${(props) => dySize(props.margin || 5)}px;
  text-align: ${(props) => props.align || 'left'};
`;

export const H1 = styled(BarText)`
  font-size: ${dySize(FontSize.FONT_SIZE_MASSIVE)}px;
`;
export const H2 = styled(BarText)`
  font-size: ${dySize(FontSize.FONT_SIZE_EXTRA_LARGE)}px;
`;
export const H3 = styled(BarText)`
  font-size: ${dySize(FontSize.FONT_SIZE_LARGE)}px;
`;
export const H4 = styled(BarText)`
  font-size: ${dySize(FontSize.FONT_SIZE_MEDIUM)}px;
`;
export const H5 = styled(BarText)`
  font-size: ${dySize(FontSize.FONT_SIZE_SMALL)}px;
`;
export const H6 = styled(BarText)`
  font-size: ${dySize(FontSize.FONT_SIZE_TINY)}px;
`;

export const BarEmptyText = styled(H4)`
  color: ${(props) => Colors.gray};
  text-align: center;
`;

export const BarTextInput = styled.TextInput`
  border: 1px solid ${(props) => Colors.gray};
  border-radius: ${(props) => props.br || 4}px;
  border-top-width: ${(props) => (props.underline ? 0 : 1)}px;
  border-left-width: ${(props) => (props.underline ? 0 : 1)}px;
  border-right-width: ${(props) => (props.underline ? 0 : 1)}px;
  padding: 10px 5px;
  min-height: ${(props) => (props.multiline ? dySize(80) : 'auto')};
  max-height: ${(props) => props.maxHeight || 120}px;
  color: ${(props) => Colors.text};
  font-size: ${(props) => props.font || dySize(FontSize.FONT_SIZE_MEDIUM)};
`;

export const BarErrorText = styled(H5)`
  color: ${(props) => Colors.red};
`;
