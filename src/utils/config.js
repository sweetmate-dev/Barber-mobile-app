const appName = 'Mocha';
const s3_Options = {
  keyPrefix: 'uploads/',
  bucket: 'mochaassets',
  region: 'us-west-1',
  accessKey: 'AKIAY22HB4TWGBFEA5JQ',
  secretKey: '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',
  successActionStatus: 201,
};
const MixpanelToken = '39d3136421e3ca4a4ddd69544d085dec';

export {appName, s3_Options, MixpanelToken};
