declare class DTFunctions {
    getAuthorizationHeader(token: string): Promise<Headers>;
    getEntities(environment: string, entity_type: string, entity_name_to_query: string, headers: Headers): Promise<any>;
    getEntitiesData(environment: string, entitiesList: any, headers: Headers): Promise<any[]>;
}
export default DTFunctions;
