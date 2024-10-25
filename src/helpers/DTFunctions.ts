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

class DTFunctions {


   // A boilerplate function to perform a series of operations
   async performGradingPlatform(
    oauth_client_id: string,
    oauth_client_secret: string,
    dt_account_urn: string,
    oauth_sso_endpoint: string,
    dt_platform_environment: string,
    documentType: string,
    documentName: string,
    validationId: string,
    maxScore: number,
    getScore: (auditInfo: any) => Promise<{ score: number, assertion_fails: any[] }>
  ): Promise<{ validationId: string, maxScore: number, finalScore: number, auditInfo: any }> {
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
    const documentDetails = await this.getDocumentDetails(dt_platform_environment, documentsList, oauth_header);

    // Generate Audit Info
    const auditInfo = await this.generateAuditInfo({ documentList: documentsList, documentDetails: documentDetails });

    // Get the score
    const { score: finalScore, assertion_fails: assertionFails } = await getScore(auditInfo);
    auditInfo.assertionFails = assertionFails;

    return {
      validationId: validationId,
      maxScore: maxScore,
      finalScore: finalScore,
      auditInfo: auditInfo
    };
  }

  async performGradingGen2(
    oauth_client_id: string,
    oauth_client_secret: string,
    dt_account_urn: string,
    oauth_sso_endpoint: string,
    dt_platform_environment: string,
    documentType: string,
    documentName: string,
    validationId: string,
    maxScore: number,
    getScore: (auditInfo: any) => Promise<{ score: number, assertion_fails: any[] }>
  ): Promise<{ validationId: string, maxScore: number, finalScore: number, auditInfo: any }> {
    // Get the authorization header
    let oauth_header = null;
    const dt_access_token = await this.getOauthAccessToken(oauth_client_id, oauth_client_secret, dt_account_urn, oauth_sso_endpoint);
    if (!dt_access_token) {
      throw new Error("Failed to obtain access token");
    }
    oauth_header = await this.getAuthorizationHeaderGen2(dt_access_token);

    // Get documents list
    const documentsList = await this.getDocumentsList(dt_platform_environment, documentType, documentName, oauth_header);

    // Get document details
    const documentDetails = await this.getDocumentDetails(dt_platform_environment, documentsList, oauth_header);

    // Generate Audit Info
    const auditInfo = await this.generateAuditInfo({ documentList: documentsList, documentDetails: documentDetails });

    // Get the score
    const { score: finalScore, assertion_fails: assertionFails } = await getScore(auditInfo);
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
    urlencoded.append("scope", "document:documents:read document:documents:write document:environment-shares:read document:direct-shares:read ");
    urlencoded.append("resource", dt_account_urn);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    try {
      const response = await fetch(oauth_sso_endpoint, requestOptions);
      const result = await response.json();
      return result.access_token;
    } catch (error: any) {
      let errorDetails;
      if (error.response) {
        errorDetails = await error.response.text();
        console.error("oAuth Access Token Error:", error.response.status, errorDetails);
      } else {
        console.error("oAuth Access Token Error:", error.message);
      }
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
          console.error("Entity ID Error:", response.status, errorDetails);
        }
      } catch (error) {
        console.error(error);
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
            console.error("Entity Details Error:", response.status, errorDetails);
          }
        } catch (error) {
          console.error(error);
        }
      }
  
      return entitiesData;
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
    if (config_endpoint === "" || !entitiesList) {
      return [];
    }
    let parameters = "";
    if (config_endpoint_extra_param.includes("/")) {
      for (const entity of entitiesList.entities) {
        const entityId = entity.entityId;
        parameters = "/" + entityId + config_endpoint_extra_param;
        let result = await this.callConfigList(environment, config_endpoint, config_name_to_query, parameters, headers);
        config_list.push(result);
      }
    } else if (config_endpoint_extra_param.includes("?")) {
      parameters = config_endpoint_extra_param;
      let result = await this.callConfigList(environment, config_endpoint, config_name_to_query, parameters, headers);
      config_list.push(result);
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
        console.error("ConfigList Error:", response.status, errorDetails);
      }
    } catch (error) {
      console.error(error);
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
                  console.error("Config Data Error:", response_details.status, errorDetails);
                }
              } catch (error) {
                console.error(error);
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
        console.error("Settings Data Error:", response.status, errorDetails);
      }
    } catch (error) {
      console.error(error);
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
      console.error("Problems Data Error:", response.status, errorDetails);
    }
  } catch (error) {
    console.error(error);
  }

  return data;
}

  // A utility function to get the documents list
  async getDocumentsList(environment: string, document_type: string, document_name_to_query: string, headers: Headers): Promise<any> {
    const documentFilter = `name contains '${document_name_to_query}' and type == '${document_type}'`;
    const request = new Request(`${environment}/platform/document/v1/documents?filter=${encodeURIComponent(documentFilter)}`, {
      method: "GET",
      headers: headers,
    });

    let documents = null;
    try {
      const response = await fetch(request);
      if (response.ok) {
        documents = await response.json();
      } else {
        const errorDetails = await response.text();
        console.error("Document List Error:", response.status, errorDetails);
      }
    } catch (error) {
      console.error(error);
    }

    return documents;
  }    

    // A utility function to get the document details
    async getDocumentDetails(environment: string, documentsList: any, headers: Headers): Promise<any[]> {
      if (documentsList === null) {
        return [];
      }
  
      let documentDetails: any[] = [];
      const requestOptions: RequestInit = {
        method: "GET",
        headers: headers,
      };
  
      for (const document of documentsList.documents) {
        const documentId = String(document.id);
        try {
          const response = await fetch(`${environment}/platform/document/v1/documents/${documentId}/content`, requestOptions);
          if (response.ok) {
            const result = await response.json();
            documentDetails.push(result);
          } else {
            const errorDetails = await response.text();
            console.error("Document Details Error:", response.status, errorDetails);
          }
        } catch (error) {
          console.error(error);
        }
      }
  
      return documentDetails;
    }

    async generateAuditInfo({
      documentList,
      documentDetails,
      entitiesList,
      entitiesData,
      settingsData,
      configList,
      configDetails,
      problemsData
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
    
      audit_info.assertionFails = [];

    return audit_info;
  }   


    checkKeywordsExistence(inputValue: string, keywords: string[]): boolean {
      return keywords.every(keyword => inputValue.toLowerCase().includes(keyword.toLowerCase()));
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


}

  export default DTFunctions;