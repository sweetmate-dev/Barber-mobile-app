import {Platform} from 'react-native';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {showAlert} from './operators';
import {s3_Options} from './config';

const fileUploadToS3 = async ({image, name}) => {
  const imageType = image.includes('.jpg') ? 'jpg' : 'png';
  const imageName = `${name}.${imageType}`;
  const file = {
    uri: (Platform.OS === 'android' ? 'file://' : '') + image,
    name: imageName,
    type: `image/${imageType}`,
  };
  const response = await RNS3.put(file, s3_Options).progress((e) =>
    console.log(e),
  );
  if (response.status !== 201) {
    showAlert('Failed to upload image to S3');
    return 'error';
  } else {
    return response.body.postResponse.location;
  }
};

export default {
  fileUploadToS3,
};
