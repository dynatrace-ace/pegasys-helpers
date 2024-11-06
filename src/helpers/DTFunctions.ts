export enum LOG_LEVELS {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4
}

//let currentLogLevel: LOG_LEVELS = LOG_LEVELS.ERROR; // Set the desired log level here

interface PlatformParams {
  oauth_client_id: string;
  oauth_client_secret: string;
  dt_account_urn: string;
  oauth_sso_endpoint: string;
  dt_platform_environment: string;
  documentType: string;
  documentName: string;
  validationId: string;
  maxScore: number;
  getScore: (auditInfo: any, headers: Headers) => Promise<{ score: number, assertion_fails: any[] }>;
}

interface Gen2Params {
  dt_gen2_environment: string;
  dt_access_token: string;
  validationId: string;
  maxScore: number;
  entity_type: string;
  entity_name_to_query: string;
  config_endpoint: string;
  config_name_to_query: string;
  config_endpoint_extra_param: string;
  settings_schema_id: string;
  settings_scope: string;
  getScore: (auditInfo: any,headers: Headers) => Promise<{ score: number, assertion_fails: any[] }>;
}


interface AuditInfoParams {
  documentList?: any;
  documentDetails?: any;
  entitiesList?: any;
  entitiesData?: any;
  settingsData?: any;
  configList?: any;
  configDetails?: any;
  problemsData?: any;
  userDashboardList?: any;
  userDashboardDetails?: any;
}

class DTFunctions {
  private currentLogLevel: LOG_LEVELS;
  private jsonSizeThreshold = 10000; // Set the size threshold in bytes

  constructor(currentLogLevel: LOG_LEVELS = LOG_LEVELS.ERROR) {
    this.currentLogLevel = currentLogLevel;
  }

  setLogLevel(level: LOG_LEVELS): void {
    this.currentLogLevel = level;
  }
   // A boilerplate function to perform a series of operations
   async performGradingPlatform({
    oauth_client_id,
    oauth_client_secret,
    dt_account_urn,
    oauth_sso_endpoint,
    dt_platform_environment,
    documentType,
    documentName,
    validationId,
    maxScore,
    getScore
  }: PlatformParams): Promise<{ validationId: string, maxScore: number, finalScore: number, auditInfo: any }> {
      // Get the authorization header
    let oauth_header = null;
    const dt_access_token = await this.getOauthAccessToken(oauth_client_id, oauth_client_secret, dt_account_urn, oauth_sso_endpoint);
    if (!dt_access_token) {
      throw new Error("Failed to obtain access token");
    }
    oauth_header = await this.getAuthorizationHeaderPlatform(dt_access_token);

    // Get documents list
    const documentsList = await this.getDocumentsList(dt_platform_environment, documentType, documentName, oauth_header);

    // Get document details
    const  { documentDetails } = await this.getDocumentDetails(dt_platform_environment, documentsList, oauth_header);

    // Generate Audit Info
    const auditInfo = await this.generateAuditInfo({ documentList: documentsList, documentDetails: documentDetails });

    // Get the score
    const { score: finalScore, assertion_fails: assertionFails } = await getScore(auditInfo, oauth_header);
    auditInfo.assertionFails = assertionFails;

    return {
      validationId: validationId,
      maxScore: maxScore,
      finalScore: finalScore,
      auditInfo: auditInfo
    };
  }

  
  async performGradingGen2({
    dt_gen2_environment,
    dt_access_token,
    validationId,
    maxScore,
    entity_type,
    entity_name_to_query,
    config_endpoint,
    config_name_to_query,
    config_endpoint_extra_param,
    settings_schema_id,
    settings_scope,
    getScore
  }: Gen2Params): Promise<{ validationId: string, maxScore: number, finalScore: number, auditInfo: any }> {
      // Get the authorization header
    const auth_header = await this.getAuthorizationHeaderGen2(dt_access_token);
  
    // Get the entities list
    const entitiesList = await this.getEntities(dt_gen2_environment, entity_type, entity_name_to_query, auth_header);
  
    // Get the entities data
    const entitiesData = await this.getEntitiesData(dt_gen2_environment, entitiesList, auth_header);
  
    // Get API v1 config data
    const configList = await this.getConfigsList(dt_gen2_environment, config_endpoint, config_name_to_query, config_endpoint_extra_param, entitiesList, auth_header);
  
    const configDetails = await this.getConfigsData(dt_gen2_environment, config_endpoint, configList, auth_header);

    // Get the settings data
    const settingsData = await this.getSettingsData(dt_gen2_environment, entitiesList, auth_header, settings_schema_id, settings_scope);
  
    // Get the problems data
    const problemsData = await this.getProblemsData(dt_gen2_environment, entitiesList, auth_header);
 
    // Get Dashboard List
    const userDashboardList = await this.getUserDashboardList(dt_gen2_environment, auth_header);
    const userDashboardDetails = await this.getDashboardsData(dt_gen2_environment, userDashboardList, auth_header);


      // Generate Audit Info
    const auditInfo = await this.generateAuditInfo({
      entitiesList: entitiesList,
      entitiesData: entitiesData,
      settingsData: settingsData,
      configList: configList,
      configDetails: configDetails,
      problemsData: problemsData,
      userDashboardList: userDashboardList,
      userDashboardDetails: userDashboardDetails
    });

    // Get the score
    const { score: finalScore, assertion_fails: assertionFails } = await getScore(auditInfo,auth_header);
    auditInfo.assertionFails = assertionFails;

    return {
      validationId: validationId,
      maxScore: maxScore,
      finalScore: finalScore,
      auditInfo: auditInfo
    };
}

  // A utility function to get the OAuth access token
  async getOauthAccessToken(
    oauth_client_id: string,
    oauth_client_secret: string,
    dt_account_urn: string,
    oauth_sso_endpoint: string
  ): Promise<string | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", oauth_client_id);
    urlencoded.append("client_secret", oauth_client_secret);
    urlencoded.append("scope", "document:documents:admin document:documents:read document:documents:write document:environment-shares:read document:direct-shares:read ");
    urlencoded.append("resource", dt_account_urn);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    try {
      const response = await fetch(oauth_sso_endpoint, requestOptions);
  
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          const errorDetails = await response.text();
          this.log(LOG_LEVELS.ERROR, `oAuth Access Token Error: ${response.status} ${errorDetails}`);
          throw new Error(`Bad Request: ${errorDetails}`);
        } else {
          // Handle other non-OK responses
          const errorDetails = await response.text();
          this.log(LOG_LEVELS.ERROR, `oAuth Access Token Error: ${response.status} ${errorDetails}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
  
      const result = await response.json();
      this.log(LOG_LEVELS.DEBUG, "oAuth Access Token result:\n" + JSON.stringify(result, null, 2));
      return result.access_token;
    } catch (error: any) {
      this.log(LOG_LEVELS.ERROR, `oAuth Access Token Error: ${error.message}`);
    }
  }

  // A utility function to get the authorization header
    async getAuthorizationHeaderPlatform(token: string): Promise<Headers> {
      // Create the headers object
      const headers = new Headers();
      // Add the authorization header
      headers.append("Authorization", "Bearer " + token);
      return headers;
    }
  
    // A utility function to get the authorization header
    async  getAuthorizationHeaderGen2(token: string): Promise<Headers> {
      // Create the headers object
      const headers = new Headers();
      // Add the authorization header
      headers.append("Authorization", "Api-Token " + token);
      return headers;
    }

    // A utility function to get the entities list
    async getEntities(environment: string, entity_type: string, entity_name_to_query: string, headers: Headers): Promise<any> {
      // Get the application with the specified name
      const entitySelector = `type(${entity_type}),entityName.contains(${entity_name_to_query})`;
      // Create the request object
      const request = new Request(`${environment}/api/v2/entities?entitySelector=${entitySelector}`, {
        method: "GET",
        headers: headers,
      });
  
      let entities = null;
      try {
        const response = await fetch(request);
        if (response.ok) {
          entities = await response.json();
        } else {
          const errorDetails = await response.text();
          this.log(LOG_LEVELS.ERROR, `"Entity ID Error: ${response.status} ${errorDetails}`);
        }
      } catch (error) {
        this.log(LOG_LEVELS.ERROR, ` ${error}`);
      }
  
      return entities;
    }
  
    // A utility function to get the entities data
    async getEntitiesData(environment: string, entitiesList: any, headers: Headers): Promise<any[]> {
      if (entitiesList === null) {
        return [];
      }
  
      let entitiesData: any[] = [];
      for (const entity of entitiesList.entities) {
        const entityId = entity.entityId;
        const request = new Request(`${environment}/api/v2/entities/${entityId}`, {
          method: "GET",
          headers: headers,
        });
  
        try {
          const response = await fetch(request);
          if (response.ok) {
            const data = await response.json();
            entitiesData.push(data);
          } else {
            const errorDetails = await response.text();
            this.log(LOG_LEVELS.ERROR, `Entity Details Error: ${response.status} ${errorDetails}`);
          }
        } catch (error) {
          this.log(LOG_LEVELS.ERROR, ` ${error}`);
        }
      }
  
      return entitiesData;
    }


  // A utility function to get the dashboard configs list
  async getUserDashboardList(
    environment: string,
    headers: Headers
  ): Promise<any[]> {
    let dashboard_list: any[] = [];
    let user_dashboard_list: any[] = [];
    const config_endpoint = "/api/config/v1/dashboards";
    const config_endpoint_extra_param = "";
    
    try {
      dashboard_list = await this.getConfigsList(
        environment,
        config_endpoint,
        "", 
        config_endpoint_extra_param,
        null,
        headers
      );
      this.log(LOG_LEVELS.DEBUG, "dashboard_list raw:\n" + JSON.stringify(dashboard_list[0].dashboards, null, 2));
      // Filter the dashboards based on the owner field
      let dashboards = dashboard_list[0].dashboards.filter((dashboard: any) => dashboard.owner !== "Dynatrace");
    
      if (dashboards.length > 0) {
        user_dashboard_list.push({dashboards: dashboards});
      }
      this.log(LOG_LEVELS.DEBUG, "user_dashboard_list:\n" + JSON.stringify(user_dashboard_list[0].dashboards, null, 2));
    } catch (error) {
      this.log(LOG_LEVELS.ERROR, `getUserDashboardList Error: ${error}`);
    }

    return user_dashboard_list;
  }


  async getDashboardsData(
    environment: string,
    dashboardList: any,
    headers: Headers
  ): Promise<any[]> {
    if (dashboardList === null) {
      return [];
    }

    let dashboardsData: any[] = [];
    const config_endpoint = "/api/config/v1/dashboards";

    try {
      dashboardsData = await this.getConfigsData(
        environment,
        config_endpoint,
        dashboardList,
        headers
      );
      this.log(LOG_LEVELS.DEBUG, "dashboardsData:\n" + JSON.stringify(dashboardsData, null, 2));
    } catch (error) {
      this.log(LOG_LEVELS.ERROR, `getDashboardsData Error: ${error}`);
    }

    return dashboardsData;
  }

  // A utility function to get the configs list
  async getConfigsList(
    environment: string,
    config_endpoint: string,
    config_name_to_query: string,
    config_endpoint_extra_param: string,
    entitiesList: any,
    headers: Headers
  ): Promise<any[]> {
    let config_list: any[] = [];
    if (config_endpoint === "") {
      return [];
    }
    let parameters = "";
    if (config_endpoint_extra_param.includes("/") && !entitiesList) {
      for (const entity of entitiesList.entities) {
        const entityId = entity.entityId;
        parameters = "/" + entityId + config_endpoint_extra_param;
        let result = await this.callConfigList(environment, config_endpoint, config_name_to_query, parameters, headers);
        config_list.push(result);
      }
      this.log(LOG_LEVELS.DEBUG, "Config List with extra param /");
    } else if (config_endpoint_extra_param.includes("?")) {
      parameters = config_endpoint_extra_param;
      let result = await this.callConfigList(environment, config_endpoint, config_name_to_query, parameters, headers);
      config_list.push(result);
      this.log(LOG_LEVELS.DEBUG, "Config List with extra param ?");
    } else {
      let result = await this.callConfigList(environment, config_endpoint, config_name_to_query, parameters, headers);
      config_list.push(result);
    }

    return config_list;
  }

  // A utility function to call the config list
  async callConfigList(
    environment: string,
    config_endpoint: string,
    config_name_to_query: string,
    parameters: string,
    headers: Headers
  ): Promise<any> {
    const request = new Request(environment + config_endpoint + parameters, {
      method: "GET",
      headers: headers,
    });

    let configlist = [];
    try {
      const response = await fetch(request);
      if (response.ok) {
        configlist = await response.json();
      } else {
        const errorDetails = await response.text();
        this.log(LOG_LEVELS.ERROR, `ConfigList Error: ${response.status} ${errorDetails}`);
      }
    } catch (error) {
      this.log(LOG_LEVELS.ERROR, `${error}`);      
    }
    return configlist;
  }
  
  async getConfigsData(
    environment: string,
    config_endpoint: string,
    configList: any,
    headers: Headers
  ): Promise<any[]> {
    if (configList === null) {
      return [];
    }

    let configsData: any[] = [];
    for (const item of configList) {
      for (const key in item) {
        if (key && key != null && Array.isArray(item[key])) {
          for (const subItem of item[key]) {
            const id = subItem ? subItem.entityId || subItem.id : null;
            if (id) {
              const request_details: RequestInfo = new Request(environment + config_endpoint + "/" + id, {
                method: 'GET',
                headers: headers,
              });

              try {
                const response_details = await fetch(request_details);
                if (response_details.ok) {
                  const configdetails = await response_details.json();
                  configsData.push(configdetails);
                } else {
                  const errorDetails = await response_details.text();
                  this.log(LOG_LEVELS.ERROR, `Config Data Error: ${response_details.status} ${errorDetails}`);
                }
              } catch (error) {
                this.log(LOG_LEVELS.ERROR, `${error}`);    
              }
            }
          }
        }
      }
    }

    return configsData;
  }

  // A utility function to get the settings data with schema
  async getSettingsData(
    environment: string,
    entitiesList: any,
    headers: Headers,
    schemaId: string,
    scope: string
  ): Promise<any[]> {
    let settings_list: any[] = [];
    if (schemaId === "") {
      return [];
    }

    let generated_scope = "";
    // if scope equals "entity", replace the dynamic entityID, if the scope is "environment" it will remain as is
    if (scope === "entity") {
      for (const entity of entitiesList.entities) {
        const entityId = entity.entityId;
        generated_scope = generated_scope + entityId + ",";
      }
    } else {
      generated_scope = scope;
    }

    if (generated_scope == "") {
      return [];
    }

    const parameters = "schemaIds=" + schemaId + "&scopes=" + generated_scope;
    const request = new Request(environment + "/api/v2/settings/objects?" + parameters, {
      method: "GET",
      headers: headers,
    });
    let data = {};
    try {
      const response = await fetch(request);
      if (response.ok) {
        data = await response.json();
        settings_list.push(data);
      } else {
        const errorDetails = await response.text();
        this.log(LOG_LEVELS.ERROR, `Settings Data Error: ${response.status} ${errorDetails}`);
      }
    } catch (error) {
      this.log(LOG_LEVELS.ERROR, `${error}`);    
    }
    return settings_list;
  }

// A utility function to find the Problems
async getProblemsData(
  environment: string,
  entitiesList: any,
  headers: Headers
): Promise<any> {
  if (!entitiesList || !entitiesList.entities || entitiesList.entities.length <= 0) {
    return null;
  }

  let rootCauseEntities = "";
  for (const entity of entitiesList.entities) {
    const entityId = entity.entityId;
    rootCauseEntities += "," + entityId;
  }
  // Remove the leading comma
  rootCauseEntities = rootCauseEntities.substring(1);

  // Create the request object
  const request = new Request(
    `${environment}/api/v2/problems?from=now-6h&problemSelector=rootCauseEntity(${rootCauseEntities})`,
    {
      method: "GET",
      headers: headers,
    }
  );

  let data = null;
  try {
    const response = await fetch(request);
    if (response.ok) {
      data = await response.json();
    } else {
      const errorDetails = await response.text();
      this.log(LOG_LEVELS.ERROR, `Problems Data Error: ${response.status} ${errorDetails}`);
    }
  } catch (error) {
    this.log(LOG_LEVELS.ERROR, `${error}`);    
  }

  return data;
}

  // A utility function to get the documents list
  async getDocumentsList(
    environment: string,
    document_type: string,
    document_name_to_query: string,
    headers: Headers
  ): Promise<any> {

    // Normalize the document_name_to_query by removing spaces and converting to lowercase
    const normalizedDocumentName = document_name_to_query.replace(/\s+/g, '').toLowerCase();

    const documentFilter = `name contains '${normalizedDocumentName}' and type == '${document_type}'`;
    const request = new Request(`${environment}/platform/document/v1/documents?admin-access=true&filter=${encodeURIComponent(documentFilter)}`, {
      method: "GET",
      headers: headers,
    });
  
    this.log(LOG_LEVELS.DEBUG, "documentFilter:\n" + JSON.stringify(documentFilter, null, 2));
  
    let documents = null;
    try {
      this.log(LOG_LEVELS.DEBUG, "headers:\n" + JSON.stringify(headers, null, 2));
      const response = await fetch(request);
      this.log(LOG_LEVELS.DEBUG, "response:\n" + JSON.stringify(response, null, 2));
      if (response.ok) {
        documents = await response.json();
      } else {
        const errorDetails = await response.text();
        this.log(LOG_LEVELS.ERROR, `Document List Error: ${response.status} ${errorDetails}`);
      }
    } catch (error) {
      this.log(LOG_LEVELS.ERROR, `${error}`);    
    }
  
    return documents;
  }   

    // A utility function to get the document details
    async getDocumentDetails(
      environment: string,
      documentsList: any,
      headers: Headers
    ): Promise<{ documentDetails: any[] }> {
      if (documentsList === null) {
        return { documentDetails: [] };
      }
    
      let documentDetails: any[] = [];
      const requestOptions: RequestInit = {
        method: "GET",
        headers: headers,
      };
    
      for (const document of documentsList.documents) {
        const documentId = String(document.id);
        try {
          const response = await fetch(`${environment}/platform/document/v1/documents/${documentId}/content?admin-access=true`, requestOptions);
          if (response.ok) {
            const result = await response.json();

            // Fetch direct-shares information
            const documentSharesFilter = `documentId=='${documentId}'`;
            const directSharesResponse = await fetch(`${environment}/platform/document/v1/direct-shares?filter=${encodeURIComponent(documentSharesFilter)}`, requestOptions);
            if (directSharesResponse.ok) {
              const directSharesResult = await directSharesResponse.json();
              this.log(LOG_LEVELS.DEBUG, "directSharesResult:\n" + JSON.stringify(directSharesResult, null, 2));
              result["direct-shares"] = directSharesResult["direct-shares"];
            } else {
              const errorDetails = await directSharesResponse.text();
              this.log(LOG_LEVELS.ERROR, `Direct Shares Error: ${directSharesResponse.status} ${errorDetails}`);
            }

            // Fetch environment-shares information
            const environmentSharesResponse = await fetch(`${environment}/platform/document/v1/environment-shares?filter=${encodeURIComponent(documentSharesFilter)}`, requestOptions);
            if (environmentSharesResponse.ok) {
              const environmentSharesResult = await environmentSharesResponse.json();
              this.log(LOG_LEVELS.DEBUG, "environmentSharesResult:\n" + JSON.stringify(environmentSharesResult, null, 2));
              result["environment-shares"] = environmentSharesResult["environment-shares"];
            } else {
              const errorDetails = await environmentSharesResponse.text();
              this.log(LOG_LEVELS.ERROR, `Environment Shares Error: ${environmentSharesResponse.status} ${errorDetails}`);
            }

            if (result.sections) {
              result.sections.forEach((section: any) => {
                if (section.state && section.state.result) {
                  delete section.state.result;
                }
                if (section.state.davis && section.state.davis.resultState) {
                  delete section.state.davis.resultState;
                }
              });
            }
            documentDetails.push(result);
          } else {
            const errorDetails = await response.text();
            this.log(LOG_LEVELS.ERROR, `Document Details Error: ${response.status} ${errorDetails}`);
          }
        } catch (error) {
          this.log(LOG_LEVELS.ERROR, `${error}`);    
        }
      }
    
      // Check the size of the resulting JSON
      const jsonString = JSON.stringify(documentDetails);
      const jsonSize = new Blob([jsonString]).size;
      if (jsonSize > this.jsonSizeThreshold) {
        documentDetails.push({ warning: "The size of the JSON output is too large" });
      }

      return { documentDetails};
    }

    async generateAuditInfo({
      documentList,
      documentDetails,
      entitiesList,
      entitiesData,
      settingsData,
      configList,
      configDetails,
      problemsData,
      userDashboardList,
      userDashboardDetails
    }: AuditInfoParams): Promise<any> {
      let audit_info: any = {};
    
      if (documentList != null) {
        audit_info["documentList"] = documentList;
      }
    
      if (documentDetails != null) {
        audit_info["documentDetails"] = documentDetails;
      }
    
      if (entitiesList != null) {
        audit_info["entitiesList"] = entitiesList;
      }
    
      if (entitiesData != null) {
        audit_info["entitiesData"] = entitiesData;
      }
    
      if (configList != null) {
        audit_info["configList"] = configList;
      }
    
      if (configDetails != null && configDetails.error == null) {
        audit_info["configDetails"] = configDetails;
      }
    
      if (settingsData != null) {
        audit_info["settingsData"] = settingsData;
      }
    
      if (problemsData != null) {
        audit_info["problemsData"] = problemsData;
      }

      if (userDashboardList != null) {
        audit_info["userDashboardList"] = userDashboardList;
      }

      if (userDashboardDetails != null) {
        audit_info["userDashboardDetails"] = userDashboardDetails;
      }
    
      audit_info.assertionFails = [];

    return audit_info;
  }   


    checkKeywordsExistence(inputValue: string, keywords: string[]): boolean {
      // Normalize the input by removing spaces and converting to lowercase
      const normalizedInput = inputValue.replace(/\s+/g, '').toLowerCase();

      // Normalize the keywords by removing spaces and converting to lowercase
      const normalizedKeywords = keywords.map(keyword => keyword.replace(/\s+/g, '').toLowerCase());
    
      return normalizedKeywords.every(keyword => normalizedInput.includes(keyword));
    }

    findIdInObject(object: any): string | null {
      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          if (typeof object[property] === "object") {
            const id = this.findIdInObject(object[property]);
            if (id) return id;
          } else if (property === 'id' || property === 'entityId') {
            return object[property];
          }
        }
      }
      return null;
    }

    log(level: LOG_LEVELS, message: string): void {
      if (level <= this.currentLogLevel) {
        console.log(message);
      }
    }

}

export default DTFunctions;