class DTFunctions {
    // A utility function to get the authorization header
    async getAuthorizationHeader(token: string): Promise<Headers> {
      // Create the headers object
      const headers = new Headers();
      // Add the authorization header
      headers.set("Authorization", "Api-Token " + token);
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
  }
  
  export default DTFunctions;