# pegasys-helpers

public notebook helper functions for the pegasys project.

## Instructions

After modifying the code you need to run `npm run build` and commit the changes in the `dist` folder to be able to consume the code in Dynatrace Notebooks.

This is using a CDN (Prefer way):

```
import helpers from "https://esm.sh/gh/dynatrace-ace/pegasys-helpers@0.0.3/dist/index.esm.js";
```

Or using a direct link

```
import {QuestionSDK} from "https://raw.githubusercontent.com/dynatrace-ace/pegasys-helpers/0.0.2/dist/index.esm.js
```
