declare const _default: () => {
    port: number;
    googleCloud: {
        projectId: string;
        apiKey: string;
        bucketName: string;
        keyFilename: string;
    };
};
export default _default;
export interface IGoogleCloudConfig {
    keyFilename: string;
    bucketName: string;
    projectId: string;
    apiKey: string;
}
