class DTFunctions {

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
    async getAuthorizationHeader(token: string): Promise<Headers> {
      // Create the headers object
      const headers = new Headers();
      // Add the authorization header
      headers.append("Authorization", "Bearer " + token);
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

    checkKeywordsExistence(inputValue: string, keywords: string[]): boolean {
      return keywords.every(keyword => inputValue.toLowerCase().includes(keyword.toLowerCase()));
    }

}

  export default DTFunctions;