# node-microframework-mongoose

Wrapper mongoose plugin for bap-node-microframework.

## Installing

To install and add the dependecy to the package.json, run the following command:

```
npm install bap-node-microframework-mongoose --save
```

## Configuration

To create a connection to *mongodb://localhost:27017*, write the following code in app/app.ts:

```javascript
// app/app.ts
...

import { Kernel } from "./kernel";
var kernel = new Kernel();
var App = new Application(<ApplicationOptions>{
    ...
}, <KernelInterface>kernel);

...

let MongoosePluginInstance = new MongoosePlugin({ "dsn": "mongodb://localhost:27017" });

...

App.registerPlugin(MongoosePluginInstance);

...

App.start();

...
```

## Using

### Model

To create a User Mongoose model, write the following code in app/modules/user/models/user.ts:

```javascript
// app/modules/user/models/user.ts
import { Container } from 'bap-node-microframework/core';

export class UserModel {
    static define(mongoose) {
        let userSchema = {
            username: String,
            email: String,
            password: String,
            firstname: String,
            lastname: String
        };
        userSchema = Container.get('mongoose').Schema(userSchema);
        return Container.get('mongoose').model('User', userSchema);
    }
}
```

### BaseController

If you want to use the BaseController abstract class:

```javascript
import { BaseControllerMongoose } from 'bap-node-microframework-mongoose';

...

class MyClass extends BaseControllerMongoose {
    ...
}
```

### ParamConverter

You can use the paramConverter decorator to get some data from the database before executing a function in a controller.

The paramConverter signature is:

```javascript
ParamConverterMongoose(aName, { 'model': modelName, 'filterBy': { fieldDB: fieldParam } })
```

where:

- aName (String): name to use when you have to access the data in the controller function (with req.params.aName, e.g. req.params.user). Example: "user"
- modelName (String): model name to use for the request. Example: "User" (create in the Model section).
- fieldDB (String): Field name in the MongoDB instance. Example: "_id".
- fieldParam (String): Field parameter to use in the router (e.g. @Get('/users/:id')). Example: "id".

If you want to use the ParamConverter:

```javascript
import { BaseControllerMongoose, ParamConverterMongoose } from 'bap-node-microframework-mongoose';

...

class UserController extends BaseControllerMongoose {
    @ParamConverterMongoose('user', { 'model': 'User', 'filterBy': { '_id': 'id' } })
    ...
}

...
```

### Example of a controller

The following code presents a complete example of a controller:

```javascript
// app/modules/user/controllers/user.ts
import { Put, WithRouter } from 'bap-node-microframework/decorators';
import { ParamConverterMongoose, BaseControllerMongoose } from 'bap-node-microframework-mongoose';
import userForm from '../../user/forms/user';

@WithRouter()
class UserController extends BaseControllerMongoose {

    @ParamConverterMongoose('user', { 'model': 'User', 'filterBy': { '_id': 'id' } })
    @Put('/users/:id', { authenticated: false })
    update(req, res) {
        super.put(req.params.user, userForm(req), req, res);
    }
}

export default UserController.router;
```
