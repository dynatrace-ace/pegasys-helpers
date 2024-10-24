declare class DTFunctions {
    getOauthAccessToken(oauth_client_id: string, oauth_client_secret: string, dt_account_urn: string, oauth_sso_endpoint: string): Promise<string | undefined>;
    getAuthorizationHeader(token: string): Promise<Headers>;
    getEntities(environment: string, entity_type: string, entity_name_to_query: string, headers: Headers): Promise<any>;
    getEntitiesData(environment: string, entitiesList: any, headers: Headers): Promise<any[]>;
    getDocumentsList(environment: string, document_type: string, document_name_to_query: string, headers: Headers): Promise<any>;
    getDocumentDetails(environment: string, documentsList: any, headers: Headers): Promise<any[]>;
}
export default DTFunctions;
