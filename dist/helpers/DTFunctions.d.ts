interface AuditInfoParams {
    documentList?: any;
    documentDetails?: any;
    entitiesList?: any;
    entitiesData?: any;
    settingsData?: any;
    configList?: any;
    configDetails?: any;
    problemsData?: any;
}
declare class DTFunctions {
    performGradingPlatform(oauth_client_id: string, oauth_client_secret: string, dt_account_urn: string, oauth_sso_endpoint: string, dt_platform_environment: string, documentType: string, documentName: string, validationId: string, maxScore: number, getScore: (auditInfo: any) => Promise<{
        score: number;
        assertion_fails: any[];
    }>): Promise<{
        validationId: string;
        maxScore: number;
        finalScore: number;
        auditInfo: any;
    }>;
    performGradingGen2(dt_gen2_environment: string, dt_access_token: string, validationId: string, maxScore: number, getScore: (auditInfo: any) => Promise<{
        score: number;
        assertion_fails: any[];
    }>, entity_type: string, entity_name_to_query: string, config_endpoint: string, config_name_to_query: string, config_endpoint_extra_param: string, settings_schema_id: string, settings_scope: string): Promise<{
        validationId: string;
        maxScore: number;
        finalScore: number;
        auditInfo: any;
    }>;
    getOauthAccessToken(oauth_client_id: string, oauth_client_secret: string, dt_account_urn: string, oauth_sso_endpoint: string): Promise<string | undefined>;
    getAuthorizationHeaderPlatform(token: string): Promise<Headers>;
    getAuthorizationHeaderGen2(token: string): Promise<Headers>;
    getEntities(environment: string, entity_type: string, entity_name_to_query: string, headers: Headers): Promise<any>;
    getEntitiesData(environment: string, entitiesList: any, headers: Headers): Promise<any[]>;
    getConfigsList(environment: string, config_endpoint: string, config_name_to_query: string, config_endpoint_extra_param: string, entitiesList: any, headers: Headers): Promise<any[]>;
    callConfigList(environment: string, config_endpoint: string, config_name_to_query: string, parameters: string, headers: Headers): Promise<any>;
    getConfigsData(environment: string, config_endpoint: string, configList: any, headers: Headers): Promise<any[]>;
    getSettingsData(environment: string, entitiesList: any, headers: Headers, schemaId: string, scope: string): Promise<any[]>;
    getProblemsData(environment: string, entitiesList: any, headers: Headers): Promise<any>;
    getDocumentsList(environment: string, document_type: string, document_name_to_query: string, headers: Headers): Promise<any>;
    getDocumentDetails(environment: string, documentsList: any, headers: Headers): Promise<any[]>;
    generateAuditInfo({ documentList, documentDetails, entitiesList, entitiesData, settingsData, configList, configDetails, problemsData }: AuditInfoParams): Promise<any>;
    checkKeywordsExistence(inputValue: string, keywords: string[]): boolean;
    findIdInObject(object: any): string | null;
}
export default DTFunctions;
