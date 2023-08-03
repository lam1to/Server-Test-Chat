export default () => {
  return {
    port: parseInt(process.env.PORT) || 4100,
    googleCloud: {
      projectId: process.env['GOOGLE_PROJECT_ID'],
      apiKey: process.env['GOOGLE_API_KEY'],
      bucketName: process.env['GOOGLE_BUCKET_NAME'],
      keyFilename: process.env['GOOGLE_CLOUD_KEY_NAME'],
    },
  };
};
export interface IGoogleCloudConfig {
  keyFilename: string;
  bucketName: string;
  projectId: string;
  apiKey: string;
}
