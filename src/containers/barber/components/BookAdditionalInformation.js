import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import * as _ from 'lodash';
import {RootView, BarView} from '../../../components/styled/View';
import {H5, H6} from '../../../components/styled/Text';
import {Colors} from '../../../themes';
import {BarInput} from '../../../components/common';

const required_informations = [
  {
    key: 'requirePhoneNumber',
    placeholder: 'Phone Number',
    keyboardType: 'phone-pad',
    errorText: 'Phone Number is required',
  },
  {
    key: 'requireStreetAddress',
    placeholder: 'Street Address',
    errorText: 'Street Address is required',
  },
  {
    key: 'requireCity',
    placeholder: 'City',
    errorText: 'City is required',
  },
  {
    key: 'requireState',
    placeholder: 'State',
    errorText: 'State is required',
  },
  {
    key: 'requireZipCode',
    placeholder: 'Zip Code',
    errorText: 'Zip Code is required',
  },
  {
    key: 'requireHowFind',
    placeholder: 'How did you find this barber?',
    errorText: 'You must answer the question "how did you find this barber?"',
  },
];

const BookAdditionalInformation = ({barber, onChangeValues}) => {
  const [inputs, setInputs] = useState({});
  useEffect(() => {
    let error = [];
    required_informations.map((info) => {
      if (!barber[info.key]) return;
      if (!inputs[info.key] || inputs[info.key].length === 0)
        error.push(info.errorText);
    });
    onChangeValues(inputs, error);
  }, [inputs]);

  const handleChange = (key) => (value) => {
    const temp = _.cloneDeep(inputs);
    temp[key] = value;
    setInputs(temp);
  };

  if (required_informations.filter((i) => barber[i.key]).length === 0) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <H5 weight="bold" mt={10}>
        ADDITIONAL INFORMATION
      </H5>

      {required_informations.map((info) => {
        if (!barber[info.key]) return null;
        return (
          <View
            key={info.key}
            style={{
              backgroundColor: Colors.card,
              marginBottom: 2,
              paddingHorizontal: 15,
            }}>
            <BarInput
              label={info.placeholder}
              onChangeText={handleChange(info.key)}
              keyboardType={info.keyboardType || 'default'}
              value={inputs[info.key]}
              lineWidth={0}
              activeLineWidth={0}
              containerStyle={{margin: -5}}
            />
          </View>
        );
      })}
    </View>
  );
};

export default BookAdditionalInformation;
