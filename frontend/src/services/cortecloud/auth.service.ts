export class CorteCloudAuthService {
    private static instance: CorteCloudAuthService;
    private authHeader: string;
    private baseUrl: string;

    private constructor() {
        this.baseUrl = 'https://apis.ccstg.com.br';
        const credentials = 'demopartner@serrabits.com.br:123456';
        this.authHeader = `Basic ${btoa(credentials)}`;
    }

    public static getInstance(): CorteCloudAuthService {
        if (!CorteCloudAuthService.instance) {
            CorteCloudAuthService.instance = new CorteCloudAuthService();
        }
        return CorteCloudAuthService.instance;
    }

    public getHeaders() {
        return {
            'accept': 'application/json',
            'authorization': this.authHeader,
            'x-dreamfactory-api-key': '5f8ebe41ee8d96a648cc9c055661cf54f4bbbb9d77bb9ec8e49178f0f491764c',
            'content-type': 'application/json'
        };
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }
}
